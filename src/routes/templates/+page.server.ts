import { error } from "@sveltejs/kit";
import { getNotionSchema } from "$lib/server/notion";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		throw error(401, "Unauthorized");
	}

	try {
		const schema = await getNotionSchema();
		return {
			schema,
			user: event.locals.user,
		};
	} catch (err) {
		const errVal = err as Error;
		console.error("Failed to load schema from Notion database for templates:", errVal);
		throw error(500, errVal.message || "Failed to load Notion schema");
	}
};
