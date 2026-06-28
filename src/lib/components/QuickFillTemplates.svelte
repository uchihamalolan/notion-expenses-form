<script lang="ts">
import { page } from "$app/state";
import type { ExpenseTemplate, FormState } from "$lib/schemas";
import { templatesStore } from "$lib/store/templates.svelte";
import TemplateDropdown from "./TemplateDropdown.svelte";

interface Props {
	form: FormState;
}

let { form = $bindable() }: Props = $props();

const templates = $derived(templatesStore.all);
const showHybrid = $derived(templates.length > 4);

const quickTemplates = $derived(
	showHybrid ? templates.filter((t) => t.pinned).slice(0, 4) : templates,
);

function applyTemplate(template: ExpenseTemplate) {
	if (template.name !== undefined) form.name = template.name;
	if (template.amount !== undefined) form.amount = template.amount;

	if (template.category) {
		form.selectedCategories = [...template.category];
	}

	if (template.payee !== undefined) {
		form.selectedPayee = template.payee;
	}

	if (template.paymentMode !== undefined) {
		const modes = page.data.schema?.paymentModes || [];
		if (modes.includes(template.paymentMode)) {
			form.selectedPaymentMode = template.paymentMode;
		}
	}

	if (template.notes !== undefined) form.notes = template.notes;
}
</script>

<ul class="flex flex-wrap gap-3 items-center">
	{#each quickTemplates as template (template.id)}
		<li>
			<button
				type="button"
				onclick={() => applyTemplate(template)}
				class="btn btn-outline btn-md rounded-btn"
			>
				{template.label}
			</button>
		</li>
	{/each}

	{#if showHybrid}
		<li>
			<TemplateDropdown {templates} onSelect={applyTemplate} />
		</li>
	{/if}
</ul>
