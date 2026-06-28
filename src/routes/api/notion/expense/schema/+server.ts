import { json, type RequestHandler } from "@sveltejs/kit";
import { NOTION_DATABASE_ID, NOTION_TOKEN } from "$env/static/private";

export const GET: RequestHandler = async (event) => {
	// Verify user is authenticated
	if (!event.locals.user) {
		return json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}`, {
			headers: {
				Authorization: `Bearer ${NOTION_TOKEN}`,
				"Notion-Version": "2022-06-28",
			},
		});

		if (!response.ok) {
			const text = await response.text();
			return json(
				{ error: `Notion API error: ${response.status} - ${text}` },
				{ status: response.status },
			);
		}

		const data = await response.json();
		const properties = data.properties || {};

		// Extract options for the select/multi-select fields
		const categories =
			properties.Category?.multi_select?.options?.map((o: { name: string }) => o.name) || [];
		const payees = properties.Payee?.select?.options?.map((o: { name: string }) => o.name) || [];
		const paymentModes =
			properties["Payment Mode"]?.select?.options?.map((o: { name: string }) => o.name) || [];

		return json({
			categories,
			payees,
			paymentModes,
		});
	} catch (err) {
		const error = err as Error;
		console.error("Failed to fetch Notion schema:", error);
		return json({ error: error.message || "Failed to fetch Notion schema" }, { status: 500 });
	}
};
