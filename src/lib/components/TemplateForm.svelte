<script lang="ts">
import { onMount } from "svelte";
import type { ExpenseTemplate, NotionSchema, TemplateFormState } from "$lib/schemas";
import { templatesStore } from "$lib/store/templates.svelte";
import TemplateFormFields from "./TemplateFormFields.svelte";

interface Props {
	schema: NotionSchema;
	templateToEdit?: ExpenseTemplate | null;
	onSave: () => void;
}

let { schema, templateToEdit = null, onSave }: Props = $props();

let availableCategories = $state<string[]>([]);
let availablePayees = $state<string[]>([]);
let availablePaymentModes = $state<string[]>([]);
let submitting = $state(false);

let form = $state<TemplateFormState>({
	label: "",
	name: "",
	amount: null,
	selectedCategories: [],
	selectedPayee: "",
	selectedPaymentMode: "",
	notes: "",
	pinned: false,
});

onMount(() => {
	if (schema) {
		availableCategories = [...schema.categories];
		availablePayees = [...schema.payees];
		availablePaymentModes = [...schema.paymentModes];
	}

	if (templateToEdit) {
		form.label = templateToEdit.label;
		form.name = templateToEdit.name || "";
		form.amount = templateToEdit.amount !== undefined ? templateToEdit.amount : null;
		form.selectedCategories = templateToEdit.category ? [...templateToEdit.category] : [];
		form.selectedPayee = templateToEdit.payee || "";
		form.selectedPaymentMode = templateToEdit.paymentMode || availablePaymentModes[0] || "";
		form.notes = templateToEdit.notes || "";
		form.pinned = !!templateToEdit.pinned;
	}
});

function handleSubmit(event: SubmitEvent) {
	event.preventDefault();
	submitting = true;

	const payload = {
		label: form.label.trim(),
		name: form.name.trim(),
		amount: form.amount ?? undefined,
		category: [...form.selectedCategories],
		payee: form.selectedPayee.trim(),
		paymentMode: form.selectedPaymentMode,
		notes: form.notes.trim(),
		pinned: form.pinned,
	};

	if (templateToEdit) {
		templatesStore.update(templateToEdit.id, payload);
	} else {
		templatesStore.save(payload);
	}

	submitting = false;
	onSave();
}
</script>

<form onsubmit={handleSubmit} class="space-y-6">
	<TemplateFormFields
		bind:form
		{submitting}
		bind:availableCategories
		bind:availablePayees
		bind:availablePaymentModes
	/>
</form>
