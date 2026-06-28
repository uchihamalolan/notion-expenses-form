<script lang="ts">
import CategoryBadges from "./CategoryBadges.svelte";

interface Props {
	selectedCategories: string[];
	availableCategories: string[];
}

let { selectedCategories = $bindable(), availableCategories = $bindable() }: Props = $props();

let categorySearch = $state("");
let detailsOpen = $state(false);

const filteredCategories = $derived(
	availableCategories.filter((cat) => cat.toLowerCase().includes(categorySearch.toLowerCase())),
);

function toggleCategory(cat: string) {
	if (selectedCategories.includes(cat)) {
		selectedCategories = selectedCategories.filter((c) => c !== cat);
	} else {
		selectedCategories = [...selectedCategories, cat];
	}
}

function handleCreateCategory() {
	const newCat = categorySearch.trim().toLowerCase();
	if (newCat && !availableCategories.includes(newCat)) {
		availableCategories = [...availableCategories, newCat].sort();
		toggleCategory(newCat);
		categorySearch = "";
	}
}
</script>

<div class="relative w-full flex flex-col gap-2">
	<!-- Hidden inputs for Form Action -->
	{#each selectedCategories as cat (cat)}
		<input type="hidden" name="category" value={cat}>
	{/each}

	<details class="dropdown w-full" bind:open={detailsOpen}>
		<summary class="btn btn-outline w-full justify-between rounded-(--rounded-btn)">
			<span>Categories ({selectedCategories.length})</span>
		</summary>
		<section
			class="dropdown-content bg-base-100 rounded-box z-30 mt-1 w-full p-4 shadow-lg border border-base-200 flex flex-col gap-3"
		>
			<search class="join w-full">
				<input
					type="text"
					placeholder="Search or type a category..."
					aria-label="Search categories"
					bind:value={categorySearch}
					class="input input-sm join-item w-full"
					autocomplete="off"
				>
				{#if categorySearch && !availableCategories.includes(categorySearch.trim().toLowerCase())}
					<button
						type="button"
						onclick={handleCreateCategory}
						class="btn btn-primary btn-sm join-item"
					>
						+ New
					</button>
				{/if}
			</search>
			<ul class="menu menu-sm p-0 overflow-y-auto max-h-48 flex flex-col gap-1">
				{#each filteredCategories as cat (cat)}
					<li>
						<!-- biome-ignore lint/a11y/noLabelWithoutControl: Label is dynamically associated with checkbox using ID -->
						<label
							for="cat-{cat}"
							class="flex items-center gap-2 p-2 rounded-(--rounded-btn) cursor-pointer select-none"
						>
							<input
								id="cat-{cat}"
								type="checkbox"
								checked={selectedCategories.includes(cat)}
								onchange={() => toggleCategory(cat)}
								class="checkbox checkbox-sm checkbox-primary"
							>
							<span class="capitalize">{cat}</span>
						</label>
					</li>
				{/each}
				{#if filteredCategories.length === 0}
					<li class="disabled p-2 text-center text-xs opacity-50">No categories found</li>
					{#if categorySearch && !availableCategories.includes(categorySearch.trim().toLowerCase())}
						<li class="p-2 text-center text-xs opacity-75">
							Click "+ New" to add "{categorySearch}"
						</li>
					{/if}
				{/if}
			</ul>
		</section>
	</details>

	<CategoryBadges {selectedCategories} onRemove={toggleCategory} />
</div>

{#if detailsOpen}
	<button
		type="button"
		class="fixed inset-0 z-20 cursor-default bg-transparent w-full h-full border-none"
		onclick={() => (detailsOpen = false)}
		aria-label="Close categories list"
	></button>
{/if}
