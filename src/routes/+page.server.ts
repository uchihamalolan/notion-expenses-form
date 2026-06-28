import { error, fail } from "@sveltejs/kit";
import { expenseFormSchema } from "$lib/schemas";
import { createNotionExpense, getNotionSchema } from "$lib/server/notion";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		throw error(401, "Unauthorized");
	}

	try {
		console.time("get-schema");
		const schema = await getNotionSchema();
		console.timeEnd("get-schema");
		return {
			schema,
		};
	} catch (err) {
		const errVal = err as Error;
		console.error("Failed to load schema from Notion database:", errVal);
		throw error(500, errVal.message || "Failed to load Notion schema");
	}
};

export const actions: Actions = {
	createExpense: async (event) => {
		if (!event.locals.user) {
			throw error(401, "Unauthorized");
		}

		try {
			const data = await event.request.formData();
			const parsed = expenseFormSchema.safeParse({
				...Object.fromEntries(data.entries()),
				category: data.getAll("category"),
			});

			if (!parsed.success) {
				const errorMsg = parsed.error.issues[0]?.message || "Invalid form data";
				return fail(400, { error: errorMsg });
			}

			await createNotionExpense(parsed.data);

			return { success: true };
		} catch (err) {
			const errorVal = err as Error;
			console.error("Failed to add Notion expense:", errorVal);
			return fail(500, { error: errorVal.message || "Failed to add expense" });
		}
	},
};
