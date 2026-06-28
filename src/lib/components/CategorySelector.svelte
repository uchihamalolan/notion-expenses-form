<script lang="ts">
import CategoryBadges from "./CategoryBadges.svelte";

interface Props {
	selectedCategories: string[];
	availableCategories: string[];
}

let { selectedCategories = $bindable(), availableCategories = $bindable() }: Props = $props();

let categorySearch = $state("");
let categoryDropdownOpen = $state(false);

const filteredCategories = $derived(
	availableCategories.filter(
		(cat) =>
			cat.toLowerCase().includes(categorySearch.toLowerCase()) && !selectedCategories.includes(cat),
	),
);

function addCategory(cat: string) {
	if (!selectedCategories.includes(cat)) {
		selectedCategories = [...selectedCategories, cat];
	}
	categorySearch = "";
	categoryDropdownOpen = false;
}

function removeCategory(cat: string) {
	selectedCategories = selectedCategories.filter((c) => c !== cat);
}

function handleCreateCategory() {
	const newCat = categorySearch.trim().toLowerCase();
	if (newCat) {
		if (!availableCategories.includes(newCat)) {
			availableCategories = [...availableCategories, newCat].sort();
		}
		addCategory(newCat);
	}
}
</script>

<fieldset class="fieldset w-full relative">
	<legend class="fieldset-legend">CATEGORIES</legend>

	<!-- <search> is the HTML5 semantic landmark for search/filter UI -->
	<search class="join w-full">
		<input
			id="category-search"
			type="text"
			placeholder="Search or type a category..."
			bind:value={categorySearch}
			onfocus={() => (categoryDropdownOpen = true)}
			class="input input-lg join-item w-full"
			autocomplete="off"
		>
		{#if categorySearch && !availableCategories.includes(categorySearch.trim().toLowerCase())}
			<button type="button" onclick={handleCreateCategory} class="btn btn-primary btn-lg join-item">
				+ New
			</button>
		{/if}
	</search>

	<CategoryBadges {selectedCategories} onRemove={removeCategory} />

	{#if categoryDropdownOpen && filteredCategories.length > 0}
		<ul
			class="menu menu-sm bg-base-200 absolute z-20 w-full top-full mt-1 max-h-48 overflow-y-auto rounded-box"
		>
			{#each filteredCategories as cat}
				<li><button type="button" onclick={() => addCategory(cat)}>{cat}</button></li>
			{/each}
		</ul>
	{/if}

	{#if categoryDropdownOpen}
		<button
			type="button"
			class="fixed inset-0 z-10 cursor-default bg-transparent w-full h-full border-none"
			onclick={() => {
				categoryDropdownOpen = false;
			}}
			aria-label="Dismiss menu"
		></button>
	{/if}
</fieldset>
