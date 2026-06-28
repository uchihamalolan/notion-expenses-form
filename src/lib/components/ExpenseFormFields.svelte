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

<form onsubmit={(e) => state.submit(e)} class="space-y-6">
	<AmountInput bind:amount={state.amount} />

	<fieldset class="fieldset bg-base-100 rounded-box gap-6">
		<!-- <legend class="fieldset-legend text-sm font-bold px-2">Expense Details</legend> -->

		<!-- Payment mode + date share a row -->
		<div class="grid grid-cols-2 gap-4">
			<div>
				<label class="label" for="payment-mode">PAYMENT MODE *</label>
				<select
					id="payment-mode"
					bind:value={state.selectedPaymentMode}
					required
					class="select select-lg"
				>
					{#each state.availablePaymentModes as mode (mode)}
						<option value={mode}>{mode}</option>
					{/each}
				</select>
			</div>

			<div>
				<label class="label" for="expense-date">DATE *</label>
				<input
					id="expense-date"
					type="date"
					bind:value={state.date}
					required
					class="input input-lg "
				>
			</div>
		</div>

		<div>
			<label class="label" for="expense-name">WHAT DID YOU BUY? *</label>
			<input
				id="expense-name"
				type="text"
				placeholder="e.g. Swiggy Lunch"
				bind:value={state.name}
				required
				class="input input-lg w-full"
			>
		</div>

		<div>
			<CategorySelector
				bind:selectedCategories={state.selectedCategories}
				bind:availableCategories={state.availableCategories}
			/>
		</div>

		<div>
			<PayeeSelector
				bind:selectedPayee={state.selectedPayee}
				bind:availablePayees={state.availablePayees}
			/>
		</div>

		<div>
			<label class="label" for="notes">NOTES</label>
			<textarea
				id="notes"
				placeholder="Add extra context..."
				bind:value={state.notes}
				rows="2"
				class="textarea textarea-lg w-full"
			></textarea>
		</div>
	</fieldset>

	<button type="submit" disabled={state.submitting} class="btn btn-primary btn-lg btn-block mt-4">
		{#if state.submitting}
			<span class="loading loading-spinner"></span>Adding...
		{:else}
			Add Expense
		{/if}
	</button>
</form>
