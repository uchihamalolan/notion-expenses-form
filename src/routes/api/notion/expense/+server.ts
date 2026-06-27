import { json, type RequestHandler } from "@sveltejs/kit";
import { NOTION_DATABASE_ID, NOTION_TOKEN } from "$env/static/private";

export const POST: RequestHandler = async (event) => {
	// Verify user is authenticated
	if (!event.locals.user) {
		return json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body = await event.request.json();
		const { name, amount, category, date, payee, paymentMode, notes } = body;

		if (!name || amount === undefined || !date || !paymentMode) {
			return json(
				{ error: "Missing required fields (Name, Amount, Date, Payment Mode)" },
				{ status: 400 },
			);
		}

		// Build properties for the page
		const properties: Record<string, unknown> = {
			Name: {
				title: [
					{
						text: {
							content: name,
						},
					},
				],
			},
			Amount: {
				number: Number(amount),
			},
			"Payment Mode": {
				select: {
					name: paymentMode,
				},
			},
			"Expense Date": {
				date: {
					start: date,
				},
			},
		};

		// Set multi-select categories
		if (Array.isArray(category) && category.length > 0) {
			properties.Category = {
				multi_select: category.map((c: string) => ({ name: c })),
			};
		} else {
			properties.Category = {
				multi_select: [],
			};
		}

		// Set payee if provided
		if (payee && payee.trim() !== "") {
			properties.Payee = {
				select: {
					name: payee.trim(),
				},
			};
		}

		// Set notes if provided
		if (notes && notes.trim() !== "") {
			properties.Notes = {
				rich_text: [
					{
						text: {
							content: notes,
						},
					},
				],
			};
		}

		const response = await fetch("https://api.notion.com/v1/pages", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${NOTION_TOKEN}`,
				"Notion-Version": "2022-06-28",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				parent: {
					database_id: NOTION_DATABASE_ID,
				},
				properties,
			}),
		});

		if (!response.ok) {
			const text = await response.text();
			console.error("Notion API Error Details:", text);
			return json(
				{ error: `Notion API returned error: ${response.status} - ${text}` },
				{ status: response.status },
			);
		}

		const responseData = await response.json();
		return json({ success: true, pageId: responseData.id });
	} catch (err) {
		const error = err as Error;
		console.error("Failed to add Notion expense page:", error);
		return json({ error: error.message || "Failed to add Notion expense page" }, { status: 500 });
	}
};
