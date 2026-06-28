import type { ExpenseTemplate } from "../schemas";

// Output: "7gX9pZ2wQa"
const generateId = () => Math.random().toString(36).substring(2, 11);

class TemplatesStore {
	#templates = $state<ExpenseTemplate[]>([]);

	constructor() {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("custom_templates");
			if (saved) {
				try {
					this.#templates = JSON.parse(saved) as ExpenseTemplate[];
					return;
				} catch (err) {
					console.error("Failed to parse custom templates", err);
				}
			}
			this.#templates = [];
		}
	}

	get all() {
		return this.#templates;
	}

	save(template: Omit<ExpenseTemplate, "id">) {
		const newTemplate: ExpenseTemplate = {
			...template,
			id: generateId(),
		};

		const custom = this.getCustomTemplates();
		custom.push(newTemplate);
		this.saveCustomTemplates(custom);

		this.#templates.push(newTemplate);
	}

	delete(id: string) {
		const custom = this.getCustomTemplates().filter((t) => t.id !== id);
		this.saveCustomTemplates(custom);

		this.#templates = this.#templates.filter((t) => t.id !== id);
	}

	update(id: string, template: Omit<ExpenseTemplate, "id">) {
		this.#templates = this.#templates.map((t) => {
			if (t.id === id) {
				return { ...template, id };
			}
			return t;
		});

		const custom = this.getCustomTemplates().map((ct) => (ct.id === id ? { ...template, id } : ct));
		this.saveCustomTemplates(custom);
	}

	togglePin(id: string) {
		this.#templates = this.#templates.map((t) => {
			if (t.id === id) {
				const updated = { ...t, pinned: !t.pinned };
				const custom = this.getCustomTemplates().map((ct) =>
					ct.id === id ? { ...ct, pinned: !ct.pinned } : ct,
				);
				this.saveCustomTemplates(custom);
				return updated;
			}
			return t;
		});
	}

	private getCustomTemplates(): ExpenseTemplate[] {
		if (typeof window === "undefined") return [];
		const saved = localStorage.getItem("custom_templates");
		if (saved) {
			try {
				return JSON.parse(saved);
			} catch (_) {}
		}
		return [];
	}

	private saveCustomTemplates(templates: ExpenseTemplate[]) {
		if (typeof window === "undefined") return;
		localStorage.setItem("custom_templates", JSON.stringify(templates));
	}
}

export const templatesStore = new TemplatesStore();
