<script lang="ts">
import type { TemplateFormState } from "$lib/schemas";
import AmountInput from "./AmountInput.svelte";
import CategorySelector from "./CategorySelector.svelte";
import PayeeSelector from "./PayeeSelector.svelte";

interface Props {
	form: TemplateFormState;
	submitting: boolean;
	availableCategories: string[];
	availablePayees: string[];
	availablePaymentModes: string[];
}

let {
	form = $bindable(),
	submitting,
	availableCategories = $bindable(),
	availablePayees = $bindable(),
	availablePaymentModes = $bindable(),
}: Props = $props();
</script>

<div class="w-full">
	<label class="label" for="template-label">TEMPLATE LABEL *</label>
	<input
		id="template-label"
		type="text"
		placeholder="e.g. Swiggy Lunch Template"
		bind:value={form.label}
		required
		class="input input-lg w-full"
	>
</div>

<AmountInput bind:amount={form.amount} />

<fieldset class="fieldset bg-base-100 rounded-box gap-6">
	<div class="w-full">
		<label class="label" for="payment-mode">PAYMENT MODE *</label>
		<select
			id="payment-mode"
			name="paymentMode"
			bind:value={form.selectedPaymentMode}
			required
			class="select select-lg w-full"
		>
			<option disabled value=""></option>
			{#each availablePaymentModes as mode (mode)}
				<option value={mode}>{mode}</option>
			{/each}
		</select>
	</div>

	<div class="w-full">
		<label class="label" for="expense-name">WHAT DID YOU BUY? *</label>
		<input
			id="expense-name"
			name="name"
			type="text"
			placeholder="e.g. Swiggy Lunch"
			bind:value={form.name}
			required
			class="input input-lg w-full"
		>
	</div>

	<CategorySelector bind:selectedCategories={form.selectedCategories} bind:availableCategories />

	<PayeeSelector bind:selectedPayee={form.selectedPayee} bind:availablePayees />

	<div class="w-full">
		<label class="label" for="notes">NOTES</label>
		<textarea
			id="notes"
			name="notes"
			placeholder="Add extra context..."
			bind:value={form.notes}
			rows="2"
			class="textarea textarea-lg w-full"
		></textarea>
	</div>

	<div class="w-full">
		<label class="label cursor-pointer justify-start gap-3 w-fit">
			<input type="checkbox" bind:checked={form.pinned} class="checkbox checkbox-primary">
			<span class="label-text font-bold">Pin to home screen quick-fill list</span>
		</label>
	</div>
</fieldset>

<button type="submit" disabled={submitting} class="btn btn-primary btn-lg btn-block mt-4">
	{#if submitting}
		<span class="loading loading-spinner"></span>Saving...
	{:else}
		Save Template
	{/if}
</button>
