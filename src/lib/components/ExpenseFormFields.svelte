<script lang="ts">
import type { ExpenseFormState } from "$lib/expense.svelte";
import AmountInput from "./AmountInput.svelte";
import CategorySelector from "./CategorySelector.svelte";
import PayeeSelector from "./PayeeSelector.svelte";

interface Props {
	state: ExpenseFormState;
}

let { state = $bindable() }: Props = $props();
</script>

<form onsubmit={(e) => state.submit(e)} class="space-y-4">
	<AmountInput bind:amount={state.amount} />

	<!-- Payment mode + date share a row -->
	<div class="grid grid-cols-2 gap-2">
		<fieldset class="fieldset">
			<legend class="fieldset-legend">PAYMENT MODE *</legend>
			<select
				id="payment-mode"
				bind:value={state.selectedPaymentMode}
				required
				class="select select-lg w-full"
			>
				{#each state.availablePaymentModes as mode (mode)}
					<option value={mode}>{mode}</option>
				{/each}
			</select>
		</fieldset>

		<fieldset class="fieldset">
			<legend class="fieldset-legend">DATE *</legend>
			<input
				id="expense-date"
				type="date"
				bind:value={state.date}
				required
				class="input input-lg w-full"
			>
		</fieldset>
	</div>

	<fieldset class="fieldset">
		<legend class="fieldset-legend">WHAT DID YOU BUY? *</legend>
		<input
			id="expense-name"
			type="text"
			placeholder="e.g. Swiggy Lunch"
			bind:value={state.name}
			required
			class="input input-lg w-full"
		>
	</fieldset>

	<CategorySelector
		bind:selectedCategories={state.selectedCategories}
		bind:availableCategories={state.availableCategories}
	/>

	<PayeeSelector
		bind:selectedPayee={state.selectedPayee}
		bind:availablePayees={state.availablePayees}
	/>

	<fieldset class="fieldset">
		<legend class="fieldset-legend">NOTES</legend>
		<textarea
			id="notes"
			placeholder="Add extra context..."
			bind:value={state.notes}
			rows="2"
			class="textarea textarea-lg w-full"
		></textarea>
	</fieldset>

	<button type="submit" disabled={state.submitting} class="btn btn-primary btn-lg btn-block mt-8">
		{#if state.submitting}
			<span class="loading loading-spinner"></span>Adding...
		{:else}
			Add Expense
		{/if}
	</button>
</form>
