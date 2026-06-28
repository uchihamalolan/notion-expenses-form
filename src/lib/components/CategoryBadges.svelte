<script lang="ts">
interface Props {
	selectedCategories: string[];
	onRemove: (cat: string) => void;
}

let { selectedCategories, onRemove }: Props = $props();
</script>

{#if selectedCategories.length > 0}
	<ul class="flex flex-wrap gap-2 mt-2">
		{#each selectedCategories as cat}
			<li class="badge badge-outline badge-secondary badge-md gap-1">
				{cat}
				<button
					type="button"
					onclick={() => onRemove(cat)}
					class="hover:bg-secondary-content/20 rounded-full w-4 h-4 flex items-center justify-center transition-colors text-[10px] leading-none border-none cursor-pointer bg-transparent opacity-70 hover:opacity-100"
					aria-label="Remove category {cat}"
				>
					✕
				</button>
			</li>
		{/each}
	</ul>
{/if}
