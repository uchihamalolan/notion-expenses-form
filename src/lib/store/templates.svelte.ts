import type { ExpenseTemplate, FormState } from "../schemas";

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
			id: `custom-${Math.random().toString(36).substring(2, 9)}`,
		};

		const custom = this.getCustomTemplates();
		custom.push(newTemplate);
		this.saveCustomTemplates(custom);

		this.#templates.push(newTemplate);
	}

	saveFromForm(form: FormState) {
		this.save({
			label: form.templateLabel.trim() || form.name.trim() || "Custom Template",
			pinned: false,
			name: form.name.trim(),
			amount: form.amount ?? undefined,
			category: [...form.selectedCategories],
			payee: form.selectedPayee.trim(),
			paymentMode: form.selectedPaymentMode,
			notes: form.notes.trim(),
		});
	}

	delete(id: string) {
		const custom = this.getCustomTemplates().filter((t) => t.id !== id);
		this.saveCustomTemplates(custom);

		this.#templates = this.#templates.filter((t) => t.id !== id);
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
