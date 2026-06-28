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

<fieldset class="fieldset relative">
	<legend class="fieldset-legend">PAYEE / MERCHANT</legend>
	<!-- <search> is the HTML5 semantic landmark for search/filter UI -->
	<search class="join w-full">
		<input
			id="payee"
			type="text"
			placeholder="Search or type a payee..."
			bind:value={payeeSearch}
			onfocus={() => (payeeDropdownOpen = true)}
			class="input input-lg join-item w-full"
			autocomplete="off"
		>
		{#if payeeSearch && !availablePayees.includes(payeeSearch)}
			<button type="button" onclick={handleCreatePayee} class="btn btn-primary btn-lg join-item">
				+ New
			</button>
		{/if}
	</search>

	<!-- Combobox Dropdown -->
	{#if payeeDropdownOpen && filteredPayees.length > 0}
		<ul
			class="menu menu-sm bg-base-200 absolute z-20 w-full top-full mt-1 max-h-48 overflow-y-auto rounded-box"
		>
			{#each filteredPayees as p}
				<li><button type="button" onclick={() => handleSelectPayee(p)}>{p}</button></li>
			{/each}
		</ul>
	{/if}

	<!-- Click-outside backstop to close dropdown -->
	{#if payeeDropdownOpen}
		<button
			type="button"
			class="fixed inset-0 z-10 cursor-default bg-transparent w-full h-full border-none"
			onclick={() => {
				if (payeeSearch.trim() && !selectedPayee) {
					selectedPayee = payeeSearch.trim();
				}
				payeeDropdownOpen = false;
			}}
			aria-label="Close dropdown"
		></button>
	{/if}
</fieldset>
