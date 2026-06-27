<script lang="ts">
import { onMount } from "svelte";
import { page } from "$app/state";
import ExpenseForm from "$lib/components/ExpenseForm.svelte";
import Header from "$lib/components/Header.svelte";
import PwaInstallPrompt from "$lib/components/PwaInstallPrompt.svelte";

let showInstallPrompt = $state(false);
const user = $derived(page.data.user);

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

<div class="min-h-screen bg-base-300 flex flex-col pb-12 safe-bottom">
	<Header {user} />
	<main class="flex-1 flex items-center justify-center p-4">
		<div class="card w-full max-w-lg bg-base-100 shadow-xl border border-base-200">
			<div class="card-body p-6 sm:p-8">
				<ExpenseForm />
			</div>
		</div>
	</main>
	<PwaInstallPrompt bind:show={showInstallPrompt} />
</div>

<style>
.safe-bottom {
	padding-bottom: calc(3rem + env(safe-area-inset-bottom, 0px));
}
</style>
