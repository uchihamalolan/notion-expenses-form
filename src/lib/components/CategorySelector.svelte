<script lang="ts">
interface Props {
	selectedCategories: string[];
	availableCategories: string[];
}

let { selectedCategories = $bindable(), availableCategories = $bindable() }: Props = $props();

let categorySearch = $state("");
let categoryDropdownOpen = $state(false);

const PASTEL_CLASSES = [
	"bg-pink-100 text-pink-700 border-pink-200",
	"bg-purple-100 text-purple-700 border-purple-200",
	"bg-sky-100 text-sky-700 border-sky-200",
	"bg-emerald-100 text-emerald-700 border-emerald-200",
	"bg-amber-100 text-amber-800 border-amber-200",
	"bg-rose-100 text-rose-700 border-rose-200",
	"bg-teal-100 text-teal-700 border-teal-200",
	"bg-indigo-100 text-indigo-700 border-indigo-200",
	"bg-violet-100 text-violet-700 border-violet-200",
	"bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
];

function getPastelClass(name: string): string {
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}
	const index = Math.abs(hash) % PASTEL_CLASSES.length;
	return PASTEL_CLASSES[index];
}

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

<div class="form-control w-full relative">
	<label class="label py-1" for="category-search">
		<span class="label-text font-semibold text-xs opacity-75">CATEGORIES</span>
	</label>

	<div class="join w-full">
		<input
			id="category-search"
			type="text"
			placeholder="Search or type a category..."
			bind:value={categorySearch}
			onfocus={() => categoryDropdownOpen = true}
			class="input input-bordered join-item w-full focus:input-primary"
			autocomplete="off"
		>
		{#if categorySearch && !availableCategories.includes(categorySearch.trim().toLowerCase())}
			<button type="button" onclick={handleCreateCategory} class="btn btn-primary join-item px-3">
				+ New
			</button>
		{/if}
	</div>

	<!-- Selected Category Badges -->
	{#if selectedCategories.length > 0}
		<div class="flex flex-wrap gap-2 mt-2">
			{#each selectedCategories as cat}
				<div
					class="badge badge-sm py-3 px-3 gap-1 border {getPastelClass(cat)} font-semibold select-none"
				>
					<span>{cat}</span>
					<button
						type="button"
						onclick={() => removeCategory(cat)}
						class="hover:text-red-900 font-bold ml-1 transition-colors"
						title="Remove"
					>
						✕
					</button>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Autocomplete Dropdown -->
	{#if categoryDropdownOpen && filteredCategories.length > 0}
		<div
			class="absolute z-20 left-0 right-0 top-full mt-1 max-h-48 overflow-y-auto bg-base-200 border border-base-300 rounded-lg shadow-lg"
		>
			{#each filteredCategories as cat}
				<button
					type="button"
					onclick={() => addCategory(cat)}
					class="w-full text-left px-4 py-2 hover:bg-primary hover:text-primary-content text-sm transition-colors"
				>
					{cat}
				</button>
			{/each}
		</div>
	{/if}

	<!-- Click-outside handler -->
	{#if categoryDropdownOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- biome-ignore lint/a11y/noStaticElementInteractions: overlay dismisser -->
		<!-- biome-ignore lint/a11y/useKeyWithClickEvents: overlay dismisser -->
		<div
			class="fixed inset-0 z-10"
			onclick={() => {
				categoryDropdownOpen = false;
			}}
		></div>
	{/if}
</div>
