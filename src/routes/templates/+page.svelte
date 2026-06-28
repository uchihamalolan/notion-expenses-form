<script lang="ts">
import { page } from "$app/state";
import Header from "$lib/components/Header.svelte";
import TemplateForm from "$lib/components/TemplateForm.svelte";
import TemplateListItem from "$lib/components/TemplateListItem.svelte";
import type { ExpenseTemplate } from "$lib/schemas";
import { templatesStore } from "$lib/store/templates.svelte";

const user = $derived(page.data.user);
const schema = $derived(page.data.schema);
const templates = $derived(templatesStore.all);

let templateToEdit = $state<ExpenseTemplate | null>(null);
let showCreateView = $state(false);

function handleSave() {
	templateToEdit = null;
	showCreateView = false;
}
</script>

<svelte:head>
	<title>Manage Templates - Notion Expenses Tracker</title>
</svelte:head>

<div class="min-h-screen bg-base-300 flex flex-col pb-12 safe-bottom">
	<Header {user} />
	<main class="p-4 mx-auto w-full max-w-lg flex flex-col gap-4">
		{#if !showCreateView && !templateToEdit}
			<section class="card-section p-6">
				<div class="flex items-center justify-between mb-4">
					<h2 class="text-lg font-bold">Your Templates</h2>
					<button
						type="button"
						onclick={() => (showCreateView = true)}
						class="btn btn-primary btn-sm"
					>
						+ Add Template
					</button>
				</div>

				{#if templates.length === 0}
					<p class="text-sm opacity-50 text-center py-6">
						No templates saved yet. Create your first template to fill expenses faster!
					</p>
				{:else}
					<ul class="flex flex-col gap-2.5">
						{#each templates as template (template.id)}
							<TemplateListItem {template} onEdit={(t) => (templateToEdit = t)} />
						{/each}
					</ul>
				{/if}
			</section>
		{:else}
			<section class="card-section p-6">
				<div class="flex items-center justify-between mb-6">
					<h2 class="text-lg font-bold">
						{templateToEdit ? "Edit Template" : "Create Template"}
					</h2>
					<button type="button" onclick={() => handleSave()} class="btn btn-ghost btn-sm">
						Cancel
					</button>
				</div>
				<TemplateForm {schema} {templateToEdit} onSave={handleSave} />
			</section>
		{/if}
	</main>
</div>

<style>
.safe-bottom {
	padding-bottom: calc(3rem + env(safe-area-inset-bottom, 0px));
}
</style>
