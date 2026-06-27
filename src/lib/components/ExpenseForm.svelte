<script lang="ts">
import { ExpenseFormState } from "$lib/expense.svelte";
import CategorySelector from "./CategorySelector.svelte";
import Icon from "./Icon.svelte";
import PayeeSelector from "./PayeeSelector.svelte";

let state = new ExpenseFormState();
</script>

{#if state.loading}
	<div class="flex flex-col items-center justify-center py-12 gap-4">
		<span class="loading loading-spinner loading-lg text-primary"></span>
		<p class="text-base-content/60 text-sm">Connecting to Notion...</p>
	</div>
{:else}
	<form onsubmit={(e) => state.submit(e)} class="space-y-5">
		<!-- Amount Input -->
		<div class="form-control w-full text-center">
			<span class="label-text text-sm font-semibold mb-1 opacity-70">AMOUNT</span>
			<div class="relative max-w-xs mx-auto flex items-center justify-center">
				<span class="text-3xl font-extrabold text-primary mr-1">₹</span>
				<input
					type="number"
					step="any"
					placeholder="0.00"
					bind:value={state.amount}
					required
					inputmode="decimal"
					class="input input-ghost text-4xl font-black text-center w-full focus:outline-none focus:bg-transparent placeholder:opacity-30 border-0 focus:ring-0 p-0"
				>
			</div>
			<div class="divider my-0"></div>
		</div>

		<!-- 1. Payment Mode -->
		<div class="form-control w-full">
			<label class="label py-1" for="payment-mode">
				<span class="label-text font-semibold text-xs opacity-75">PAYMENT MODE *</span>
			</label>
			<select
				id="payment-mode"
				bind:value={state.selectedPaymentMode}
				required
				class="select select-bordered w-full focus:select-primary"
			>
				{#each state.availablePaymentModes as mode}
					<option value={mode}>{mode}</option>
				{/each}
			</select>
		</div>

		<!-- 2. What did you buy -->
		<div class="form-control w-full">
			<label class="label py-1" for="expense-name">
				<span class="label-text font-semibold text-xs opacity-75">WHAT DID YOU BUY? *</span>
			</label>
			<input
				id="expense-name"
				type="text"
				placeholder="e.g. Swiggy Lunch"
				bind:value={state.name}
				required
				class="input input-bordered w-full focus:input-primary"
			>
		</div>

		<!-- 3. Category (Autocomplete) -->
		<CategorySelector
			bind:selectedCategories={state.selectedCategories}
			bind:availableCategories={state.availableCategories}
		/>

		<!-- 4. Payee/merchant (Autocomplete) -->
		<PayeeSelector
			bind:selectedPayee={state.selectedPayee}
			bind:availablePayees={state.availablePayees}
		/>

		<!-- 5. Date -->
		<div class="form-control w-full">
			<label class="label py-1" for="expense-date">
				<span class="label-text font-semibold text-xs opacity-75">DATE *</span>
			</label>
			<input
				id="expense-date"
				type="date"
				bind:value={state.date}
				required
				class="input input-bordered w-full focus:input-primary"
			>
		</div>

		<!-- 6. Note -->
		<div class="form-control w-full">
			<label class="label py-1" for="notes">
				<span class="label-text font-semibold text-xs opacity-75">NOTES</span>
			</label>
			<textarea
				id="notes"
				placeholder="Add extra context..."
				bind:value={state.notes}
				rows="2"
				class="textarea textarea-bordered w-full focus:textarea-primary leading-tight"
			></textarea>
		</div>

		<!-- Submit Button -->
		<button
			type="submit"
			disabled={state.submitting}
			class="btn btn-primary btn-block text-white mt-4 active:scale-[0.98] transition-transform duration-100"
		>
			{#if state.submitting}
				<span class="loading loading-spinner"></span>Adding...
			{:else}
				Add Expense
			{/if}
		</button>
	</form>
{/if}

{#if state.statusMessage}
	<div class="toast toast-top toast-center z-50">
		<div
			class="alert {state.statusMessage.type === 'success' ? 'alert-success' : 'alert-error'} shadow-lg text-white"
		>
			<div>
				{#if state.statusMessage.type === 'success'}
					<Icon name="success" class="stroke-current flex-shrink-0 h-6 w-6 inline-block mr-1" />
				{:else}
					<Icon name="error" class="stroke-current flex-shrink-0 h-6 w-6 inline-block mr-1" />
				{/if}
				<span>{state.statusMessage.text}</span>
			</div>
		</div>
	</div>
{/if}
