<script lang="ts">
import type { ExpenseTemplate } from "$lib/schemas";
import { templatesStore } from "$lib/store/templates.svelte";
import Icon from "./Icon.svelte";

interface Props {
	template: ExpenseTemplate;
	onEdit: (t: ExpenseTemplate) => void;
}

let { template, onEdit }: Props = $props();

let pendingDelete = $state(false);
</script>

<li class="flex items-center gap-2 w-full p-2 bg-base-200 rounded-btn">
	<div class="flex-1 flex flex-col gap-0.5">
		<strong class="text-sm">{template.label}</strong>
		{#if template.amount}
			<span class="text-xs font-mono opacity-70">₹{template.amount}</span>
		{/if}
	</div>

	<div class="flex items-center gap-1">
		<button
			type="button"
			onclick={() => templatesStore.togglePin(template.id)}
			class="btn btn-ghost btn-circle btn-xs {template.pinned ? 'text-warning' : 'opacity-30'}"
			aria-label={template.pinned ? "Unpin template" : "Pin template"}
		>
			<Icon name="pin" class="size-4" />
		</button>

		<button
			type="button"
			onclick={() => onEdit(template)}
			class="btn btn-ghost btn-circle btn-xs opacity-60 hover:opacity-100"
			aria-label="Edit template"
		>
			✏️
		</button>

		{#if pendingDelete}
			<span class="text-xs font-semibold text-error">Delete?</span>
			<button
				type="button"
				onclick={() => { templatesStore.delete(template.id); pendingDelete = false; }}
				class="btn btn-error btn-xs"
			>
				Yes
			</button>
			<button type="button" onclick={() => (pendingDelete = false)} class="btn btn-ghost btn-xs">
				No
			</button>
		{:else}
			<button
				type="button"
				onclick={() => (pendingDelete = true)}
				class="btn btn-ghost btn-circle btn-xs text-error opacity-60 hover:opacity-100"
				aria-label="Delete template"
			>
				<Icon name="trash" class="size-4" />
			</button>
		{/if}
	</div>
</li>
