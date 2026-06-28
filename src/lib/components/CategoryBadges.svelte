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
					class="btn btn-ghost btn-xs btn-circle"
					aria-label="Remove category {cat}"
				>
					✕
				</button>
			</li>
		{/each}
	</ul>
{/if}
