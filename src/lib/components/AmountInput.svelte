<script lang="ts">
interface Props {
	amount: number | null;
}

let { amount = $bindable() }: Props = $props();
</script>

<div class="form-control text-center">
	<label class="sr-only" for="expense-amount">AMOUNT</label>
	<div class="relative max-w-xs mx-auto flex items-center justify-center">
		<span class="text-3xl font-extrabold text-primary mr-1" aria-hidden="true">₹</span>
		<input
			id="expense-amount"
			name="amount"
			type="number"
			step="any"
			placeholder="0.00"
			bind:value={amount}
			required
			inputmode="decimal"
			class="input input-ghost text-4xl font-black text-center focus:outline-none focus:bg-transparent placeholder:opacity-30 border-0 focus:ring-0 p-0"
			aria-label="Amount in Rupees"
		>
	</div>
	<div class="divider mt-2 mb-4"></div>
</div>
