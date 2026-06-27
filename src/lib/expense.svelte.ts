export class ExpenseFormState {
	name = $state("");
	amount = $state<number | null>(null);
	selectedCategories = $state<string[]>([]);
	date = $state("");
	selectedPayee = $state("");
	selectedPaymentMode = $state("");
	notes = $state("");

	availableCategories = $state<string[]>([]);
	availablePayees = $state<string[]>([]);
	availablePaymentModes = $state<string[]>([]);

	loading = $state(true);
	submitting = $state(false);
	statusMessage = $state<{ type: "success" | "error"; text: string } | null>(null);

	constructor() {
		const today = new Date();
		const offset = today.getTimezoneOffset();
		const localToday = new Date(today.getTime() - offset * 60 * 1000);
		this.date = localToday.toISOString().split("T")[0];
		this.fetchSchema();
	}

	async fetchSchema() {
		try {
			this.loading = true;
			const res = await fetch("/api/notion/schema");
			if (!res.ok) throw new Error("Failed to load options from Notion");
			const data = await res.json();
			this.availableCategories = data.categories.sort();
			this.availablePayees = data.payees.sort();
			this.availablePaymentModes = data.paymentModes.sort();
			if (this.availablePaymentModes.length > 0) {
				this.selectedPaymentMode = this.availablePaymentModes.includes("HDFC")
					? "HDFC"
					: this.availablePaymentModes[0];
			}
		} catch (err) {
			console.error(err);
			this.statusMessage = {
				type: "error",
				text: "Error loading Notion schema. Check credentials.",
			};
		} finally {
			this.loading = false;
		}
	}

	async submit(e: SubmitEvent) {
		e.preventDefault();
		if (
			!this.name ||
			this.amount === null ||
			this.amount <= 0 ||
			!this.date ||
			!this.selectedPaymentMode
		) {
			this.statusMessage = { type: "error", text: "Please fill in all required fields." };
			return;
		}
		try {
			this.submitting = true;
			this.statusMessage = null;
			const res = await fetch("/api/notion/expense", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: this.name,
					amount: this.amount,
					category: this.selectedCategories,
					date: this.date,
					payee: this.selectedPayee,
					paymentMode: this.selectedPaymentMode,
					notes: this.notes,
				}),
			});
			const result = await res.json();
			if (!res.ok) throw new Error(result.error || "Failed to add expense");
			this.statusMessage = { type: "success", text: "Expense recorded successfully!" };
			this.name = "";
			this.amount = null;
			this.selectedCategories = [];
			this.selectedPayee = "";
			this.notes = "";
			this.fetchSchema();
			setTimeout(() => {
				if (this.statusMessage?.type === "success") this.statusMessage = null;
			}, 3000);
		} catch (err) {
			const errorVal = err as Error;
			this.statusMessage = {
				type: "error",
				text: errorVal.message || "An unexpected error occurred",
			};
		} finally {
			this.submitting = false;
		}
	}
}
