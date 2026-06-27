<script lang="ts">
interface Props {
	selectedPayee: string;
	availablePayees: string[];
}

let { selectedPayee = $bindable(), availablePayees = $bindable() }: Props = $props();

let payeeSearch = $state("");
let payeeDropdownOpen = $state(false);

const filteredPayees = $derived(
	availablePayees.filter((p) => p.toLowerCase().includes(payeeSearch.toLowerCase())),
);

// Sync search input if selectedPayee changes externally
$effect(() => {
	payeeSearch = selectedPayee;
});

function handleSelectPayee(payee: string) {
	selectedPayee = payee;
	payeeSearch = payee;
	payeeDropdownOpen = false;
}

function handleCreatePayee() {
	const newPayee = payeeSearch.trim();
	if (newPayee && !availablePayees.includes(newPayee)) {
		availablePayees = [...availablePayees, newPayee].sort();
		selectedPayee = newPayee;
		payeeDropdownOpen = false;
	}
}
</script>

<div class="form-control w-full relative">
	<label class="label py-1" for="payee">
		<span class="label-text font-semibold text-xs opacity-75">PAYEE / MERCHANT</span>
	</label>
	<div class="join w-full">
		<input
			id="payee"
			type="text"
			placeholder="Search or type a payee..."
			bind:value={payeeSearch}
			onfocus={() => payeeDropdownOpen = true}
			class="input input-bordered join-item w-full focus:input-primary"
			autocomplete="off"
		>
		{#if payeeSearch && !availablePayees.includes(payeeSearch)}
			<button
				type="button"
				onclick={handleCreatePayee}
				class="btn btn-primary join-item px-3"
				title="Add new payee"
			>
				+ New
			</button>
		{/if}
	</div>

	<!-- Combobox Dropdown -->
	{#if payeeDropdownOpen && filteredPayees.length > 0}
		<div
			class="absolute z-20 left-0 right-0 top-full mt-1 max-h-48 overflow-y-auto bg-base-200 border border-base-300 rounded-lg shadow-lg"
		>
			{#each filteredPayees as p}
				<button
					type="button"
					onclick={() => handleSelectPayee(p)}
					class="w-full text-left px-4 py-2 hover:bg-primary hover:text-primary-content text-sm transition-colors"
				>
					{p}
				</button>
			{/each}
		</div>
	{/if}

	<!-- Click-outside backstop to close dropdown -->
	{#if payeeDropdownOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- biome-ignore lint/a11y/noStaticElementInteractions: overlay dismisser -->
		<!-- biome-ignore lint/a11y/useKeyWithClickEvents: overlay dismisser -->
		<div
			class="fixed inset-0 z-10"
			onclick={() => {
				if (payeeSearch.trim() && !selectedPayee) {
					selectedPayee = payeeSearch.trim();
				}
				payeeDropdownOpen = false;
			}}
		></div>
	{/if}
</div>
