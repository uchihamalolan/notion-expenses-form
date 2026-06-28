<script lang="ts">
interface Props {
	selectedCategories: string[];
	onRemove: (cat: string) => void;
}

let { selectedCategories, onRemove }: Props = $props();
</script>

{#if selectedCategories.length > 0}
	<ul class="flex flex-wrap gap-2 mt-2">
		{#each selectedCategories as cat (cat)}
			<li class="badge badge-outline badge-secondary badge-md flex justify-between">
				{cat}
				<button
					type="button"
					onclick={() => onRemove(cat)}
					class="btn btn-soft btn-secondary btn-circle size-4 text-[10px]"
					aria-label="Remove category {cat}"
				>
					✕
				</button>
			</li>
		{/each}
	</ul>
{/if}
