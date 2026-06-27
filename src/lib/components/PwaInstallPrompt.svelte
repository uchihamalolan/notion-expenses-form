<script lang="ts">
import Icon from "./Icon.svelte";

interface Props {
	show: boolean;
}

let { show = $bindable() }: Props = $props();
</script>

{#if show}
	<div
		class="fixed bottom-0 left-0 right-0 p-4 bg-base-100 border-t border-base-300 shadow-2xl z-40 flex flex-col gap-3 animate-slide-up sm:max-w-md sm:mx-auto sm:rounded-t-2xl sm:bottom-0"
	>
		<div class="flex justify-between items-start">
			<div class="flex gap-3 items-center">
				<div
					class="w-10 h-10 rounded-xl bg-primary text-primary-content flex items-center justify-center shadow"
				>
					<span class="font-bold text-xl">₹</span>
				</div>
				<div>
					<h3 class="font-bold text-sm">Install Expenses Tracker</h3>
					<p class="text-xs text-base-content/60">Add this PWA to your iPhone Home Screen.</p>
				</div>
			</div>
			<button type="button" onclick={() => show = false} class="btn btn-ghost btn-xs btn-circle">
				✕
			</button>
		</div>
		<div
			class="text-xs text-base-content/80 flex items-center flex-wrap gap-1 leading-relaxed bg-base-200 p-3 rounded-xl"
		>
			<span>Tap the share button</span>
			<Icon name="share" class="w-4 h-4 text-primary inline mx-1" />
			<span>in Safari, then select</span>
			<span class="font-bold text-primary">"Add to Home Screen"</span>
			<span>from the menu list.</span>
		</div>
	</div>
{/if}
