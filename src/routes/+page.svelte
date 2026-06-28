<script lang="ts">
import { onMount } from "svelte";
import { page } from "$app/state";
import ExpenseForm from "$lib/components/ExpenseForm.svelte";
import Header from "$lib/components/Header.svelte";
import PwaInstallPrompt from "$lib/components/PwaInstallPrompt.svelte";

let showInstallPrompt = $state(false);
const user = $derived(page.data.user);
const schema = $derived(page.data.schema);

onMount(() => {
	const isIOS =
		/iPad|iPhone|iPod/.test(navigator.userAgent) ||
		(navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

	const isStandalone =
		(window.navigator as Navigator & { standalone?: boolean }).standalone ||
		window.matchMedia("(display-mode: standalone)").matches;

	if (isIOS && !isStandalone) showInstallPrompt = true;
});
</script>

<svelte:head>
	<title>Log Expense - Notion Expenses Tracker</title>
	<meta
		name="description"
		content="Log and track your daily expenses quickly and sync them directly to your Notion database."
	>
</svelte:head>

<div class="min-h-screen bg-base-300 flex flex-col pb-12 safe-bottom">
	<Header {user} />
	<main class="p-4 mx-auto w-full max-w-lg">
		<ExpenseForm {schema} />
	</main>
	<PwaInstallPrompt bind:show={showInstallPrompt} />
</div>

<style>
.safe-bottom {
	padding-bottom: calc(3rem + env(safe-area-inset-bottom, 0px));
}
</style>
