<script lang="ts">
import type { ExpenseTemplate } from "$lib/schemas";
import Icon from "./Icon.svelte";

interface Props {
	templates: ExpenseTemplate[];
	onSelect: (template: ExpenseTemplate) => void;
}

let { templates, onSelect }: Props = $props();

let searchQuery = $state("");
let isOpen = $state(false);

const filteredTemplates = $derived(
	templates.filter(
		(t) =>
			t.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
			(t.name?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()),
	),
);

function handleSelect(template: ExpenseTemplate) {
	onSelect(template);
	isOpen = false;
	searchQuery = "";
}
</script>

<details class="dropdown dropdown-bottom dropdown-end" bind:open={isOpen}>
	<summary class="btn btn-outline btn-md gap-1">
		<Icon name="zap" class="size-5 text-warning" />
		More ({templates.length})
	</summary>
	<section
		class="dropdown-content bg-base-100 rounded-box z-30 mt-1 w-72 p-3 shadow-lg border border-base-200 flex flex-col gap-2"
	>
		<search class="w-full">
			<input
				type="text"
				placeholder="Search templates..."
				aria-label="Search templates"
				bind:value={searchQuery}
				class="input input-sm w-full"
				autocomplete="off"
			>
		</search>
		<ul class="menu menu-sm p-0 overflow-y-auto max-h-56 flex flex-col gap-1">
			{#each filteredTemplates as template (template.id)}
				<li>
					<button
						type="button"
						onclick={() => handleSelect(template)}
						class="btn btn-soft p-2 flex flex-col items-start gap-2"
					>
						<div class="flex items-center justify-between w-full">
							<strong>{template.label}</strong>
							{#if template.amount !== undefined && template.amount !== null}
								<span class="text-xs font-mono font-bold">₹{template.amount}</span>
							{/if}
						</div>
						<small class="flex flex-wrap gap-1 opacity-60">
							{#if template.category}
								{#each template.category as cat (cat)}
									<span class="badge badge-outline badge-xs">{cat}</span>
								{/each}
							{/if}
							{#if template.payee}
								<span>• {template.payee}</span>
							{/if}
							{#if template.paymentMode}
								<span>• {template.paymentMode}</span>
							{/if}
						</small>
					</button>
				</li>
			{/each}
			{#if filteredTemplates.length === 0}
				<li class="disabled p-2 text-center text-xs opacity-50">No templates found</li>
			{/if}
		</ul>
	</section>
</details>

{#if isOpen}
	<button
		type="button"
		class="fixed inset-0 z-20 cursor-default bg-transparent w-full h-full border-none"
		onclick={() => (isOpen = false)}
		aria-label="Close templates list"
	></button>
{/if}
