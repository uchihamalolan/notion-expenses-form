<script lang="ts">
import type { SubmitFunction } from "@sveltejs/kit";
import { onMount } from "svelte";
import { enhance } from "$app/forms";
import type { FormState, NotionSchema } from "$lib/schemas";
import ExpenseFormFields from "./ExpenseFormFields.svelte";
import FormSkeleton from "./FormSkeleton.svelte";
import FormToast from "./FormToast.svelte";
import QuickFillTemplates from "./QuickFillTemplates.svelte";

let { schema }: { schema: NotionSchema } = $props();

let availableCategories = $state<string[]>([]);
let availablePayees = $state<string[]>([]);
let availablePaymentModes = $state<string[]>([]);

const getLocalDate = () =>
	new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];

let form = $state<FormState>({
	name: "",
	amount: null,
	selectedCategories: [],
	date: getLocalDate(),
	selectedPayee: "",
	selectedPaymentMode: "",
	notes: "",
});

onMount(() => {
	if (schema) {
		availableCategories = [...schema.categories];
		availablePayees = [...schema.payees];
		availablePaymentModes = [...schema.paymentModes];

		form.selectedPaymentMode = availablePaymentModes.includes("HDFC")
			? "HDFC"
			: availablePaymentModes[0] || "";
	}
});

let submitting = $state(false);
let statusMessage = $state<{ type: "success" | "error"; text: string } | null>(null);

const handleEnhance: SubmitFunction = () => {
	submitting = true;
	statusMessage = null;

	return async ({ result, update }) => {
		submitting = false;

		if (result.type === "success") {
			statusMessage = { type: "success", text: "Expense recorded successfully!" };
			form.name = "";
			form.amount = null;
			form.selectedCategories = [];
			form.selectedPayee = "";
			form.notes = "";
			await update();
			setTimeout(() => {
				if (statusMessage?.type === "success") statusMessage = null;
			}, 3000);
		} else if (result.type === "failure") {
			const data = result.data as { error?: string };
			statusMessage = {
				type: "error",
				text: data?.error || "Failed to add expense",
			};
		} else if (result.type === "error") {
			statusMessage = {
				type: "error",
				text: result.error?.message || "An unexpected error occurred",
			};
		}
	};
};
const sectionStyle = "card card-body bg-base-100 border border-base-200 rounded-box";
</script>

{#if !schema}
	<section class="{sectionStyle} w-full max-w-lg">
		<FormSkeleton />
	</section>
{:else}
	<div class="flex flex-col gap-4 w-full max-w-lg">
		<section class="{sectionStyle} p-4">
			<h2 class="text-xs font-bold opacity-60 tracking-wider uppercase mb-3">Quick Templates</h2>
			<QuickFillTemplates bind:form />
		</section>

		<section class="{sectionStyle} p-6">
			<form method="POST" action="?/createExpense" use:enhance={handleEnhance} class="space-y-6">
				<ExpenseFormFields
					bind:form
					{submitting}
					bind:availableCategories
					bind:availablePayees
					bind:availablePaymentModes
				/>
			</form>
		</section>
	</div>
{/if}

<FormToast message={statusMessage} />
