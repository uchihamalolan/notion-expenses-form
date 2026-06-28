<script lang="ts">
import { onMount } from "svelte";
import { ExpenseFormState } from "$lib/expense.svelte";
import ExpenseFormFields from "./ExpenseFormFields.svelte";
import FormSkeleton from "./FormSkeleton.svelte";
import FormToast from "./FormToast.svelte";

let state = $state(new ExpenseFormState());

onMount(() => {
	state.fetchSchema();
});
</script>

{#if state.loading}
	<FormSkeleton />
{:else}
	<ExpenseFormFields bind:state />
{/if}

<FormToast message={state.statusMessage} />
