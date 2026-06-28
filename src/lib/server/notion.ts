import { NOTION_DATABASE_ID, NOTION_TOKEN } from "$env/static/private";
import type { Expense, NotionSchema } from "$lib/schemas";

export async function getNotionSchema(): Promise<NotionSchema> {
	const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}`, {
		headers: {
			Authorization: `Bearer ${NOTION_TOKEN}`,
			"Notion-Version": "2022-06-28",
		},
	});

	if (!response.ok) {
		const text = await response.text();
		console.error(`Notion API database query error: ${response.status} - ${text}`);
		throw new Error(`Failed to retrieve Notion database: ${response.status}`);
	}

	const data = await response.json();
	const properties = data.properties || {};

	const categories =
		properties.Category?.multi_select?.options?.map((o: { name: string }) => o.name).sort() || [];
	const payees =
		properties.Payee?.select?.options?.map((o: { name: string }) => o.name).sort() || [];
	const paymentModes =
		properties["Payment Mode"]?.select?.options?.map((o: { name: string }) => o.name).sort() || [];

	return {
		categories,
		payees,
		paymentModes,
	};
}

export async function createNotionExpense(expense: Expense): Promise<void> {
	const { name, amount, category, date, payee, paymentMode, notes } = expense;

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
			number: amount,
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

	if (category.length > 0) {
		properties.Category = {
			multi_select: category.map((c) => ({ name: c })),
		};
	} else {
		properties.Category = {
			multi_select: [],
		};
	}

	if (payee && payee.trim() !== "") {
		properties.Payee = {
			select: {
				name: payee.trim(),
			},
		};
	}

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
		console.error("Notion API create page error details:", text);
		throw new Error(`Notion API error: ${response.status} - ${text}`);
	}
}
