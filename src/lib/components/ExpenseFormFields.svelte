<script lang="ts">
import type { SubmitFunction } from "@sveltejs/kit";
import { enhance } from "$app/forms";
import type { FormState } from "$lib/schemas";
import AmountInput from "./AmountInput.svelte";
import CategorySelector from "./CategorySelector.svelte";
import PayeeSelector from "./PayeeSelector.svelte";

interface Props {
	form: FormState;
	submitting: boolean;
	statusMessage: { type: "success" | "error"; text: string } | null;
	availableCategories: string[];
	availablePayees: string[];
	availablePaymentModes: string[];
}

let {
	form = $bindable(),
	submitting = $bindable(),
	statusMessage = $bindable(),
	availableCategories = $bindable(),
	availablePayees = $bindable(),
	availablePaymentModes = $bindable(),
}: Props = $props();

const handleEnhance: SubmitFunction = () => {
	submitting = true;
	statusMessage = null;

	return async ({ result, update }) => {
		submitting = false;

		if (result.type === "success") {
			statusMessage = { type: "success", text: "Expense recorded successfully!" };
			form.name = "";
			form.amount = null;
			form.selectedCategories = [];
			form.selectedPayee = "";
			form.notes = "";
			await update();
			setTimeout(() => {
				if (statusMessage?.type === "success") statusMessage = null;
			}, 3000);
		} else if (result.type === "failure") {
			const data = result.data as { error?: string };
			statusMessage = {
				type: "error",
				text: data?.error || "Failed to add expense",
			};
		} else if (result.type === "error") {
			statusMessage = {
				type: "error",
				text: result.error?.message || "An unexpected error occurred",
			};
		}
	};
};
</script>

<form method="POST" action="?/createExpense" use:enhance={handleEnhance} class="space-y-6">
	<AmountInput bind:amount={form.amount} />

	<fieldset class="fieldset bg-base-100 rounded-box gap-6">
		<!-- Payment mode + date share a row -->
		<div class="grid grid-cols-2 gap-4">
			<label class="floating-label">
				<span>Payment Mode *</span>
				<select
					id="payment-mode"
					name="paymentMode"
					bind:value={form.selectedPaymentMode}
					required
					class="select select-lg"
				>
					<option disabled value=""></option>
					{#each availablePaymentModes as mode (mode)}
						<option value={mode}>{mode}</option>
					{/each}
				</select>
			</label>

			<label class="floating-label">
				<span>Date *</span>
				<input
					id="expense-date"
					name="date"
					type="date"
					placeholder="Date"
					bind:value={form.date}
					required
					class="input input-lg"
				>
			</label>
		</div>

		<label class="floating-label">
			<span>What did you buy? *</span>
			<input
				id="expense-name"
				name="name"
				type="text"
				placeholder="What did you buy?"
				bind:value={form.name}
				required
				class="input input-lg w-full"
			>
		</label>

		<CategorySelector bind:selectedCategories={form.selectedCategories} bind:availableCategories />

		<PayeeSelector bind:selectedPayee={form.selectedPayee} bind:availablePayees />

		<label class="floating-label">
			<span>Notes</span>
			<textarea
				id="notes"
				name="notes"
				placeholder="Notes"
				bind:value={form.notes}
				rows="2"
				class="textarea textarea-lg w-full"
			></textarea>
		</label>
	</fieldset>

	<button type="submit" disabled={submitting} class="btn btn-primary btn-lg btn-block mt-4">
		{#if submitting}
			<span class="loading loading-spinner"></span>Adding...
		{:else}
			Add Expense
		{/if}
	</button>
</form>
