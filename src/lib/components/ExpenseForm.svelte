<script lang="ts">
import { untrack } from "svelte";
import type { FormState, NotionSchema } from "$lib/schemas";
import ExpenseFormFields from "./ExpenseFormFields.svelte";
import FormSkeleton from "./FormSkeleton.svelte";
import FormToast from "./FormToast.svelte";
import QuickFillTemplates from "./QuickFillTemplates.svelte";

let { schema }: { schema: NotionSchema } = $props();

const getLocalDateString = () => {
	const today = new Date();
	const offset = today.getTimezoneOffset();
	return new Date(today.getTime() - offset * 60 * 1000).toISOString().split("T")[0];
};

let form = $state<FormState>({
	name: "",
	amount: null,
	selectedCategories: [],
	date: getLocalDateString(),
	selectedPayee: "",
	selectedPaymentMode: "",
	notes: "",
});

let availableCategories = $state<string[]>([]);
let availablePayees = $state<string[]>([]);
let availablePaymentModes = $state<string[]>([]);

let submitting = $state(false);
let statusMessage = $state<{ type: "success" | "error"; text: string } | null>(null);

const loading = $derived(!schema);

$effect(() => {
	if (schema) {
		untrack(() => {
			availableCategories = [...schema.categories];
			availablePayees = [...schema.payees];
			availablePaymentModes = [...schema.paymentModes];

			if (availablePaymentModes.length > 0 && !form.selectedPaymentMode) {
				form.selectedPaymentMode = availablePaymentModes.includes("HDFC")
					? "HDFC"
					: availablePaymentModes[0];
			}
		});
	}
});
</script>

{#if loading}
	<section class="card card-body bg-base-100 border border-base-200 rounded-box w-full max-w-lg">
		<FormSkeleton />
	</section>
{:else}
	<div class="flex flex-col gap-4 w-full max-w-lg">
		<section class="card card-body bg-base-100 border border-base-200 rounded-box p-4">
			<h2 class="text-xs font-bold opacity-60 tracking-wider uppercase mb-3">Quick Templates</h2>
			<QuickFillTemplates bind:form />
		</section>

		<section class="card card-body bg-base-100 border border-base-200 rounded-box p-6">
			<ExpenseFormFields
				bind:form
				bind:submitting
				bind:statusMessage
				bind:availableCategories
				bind:availablePayees
				bind:availablePaymentModes
			/>
		</section>
	</div>
{/if}

<FormToast message={statusMessage} />
