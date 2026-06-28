<script lang="ts">
import Icon from "./Icon.svelte";

interface Props {
	show: boolean;
}

let { show = $bindable() }: Props = $props();
</script>

{#if show}
	<aside
		class="fixed bottom-0 left-0 right-0 p-4 bg-base-100 border-t border-base-300 shadow-2xl z-40 flex flex-col gap-3 animate-slide-up sm:max-w-md sm:mx-auto sm:rounded-t-box"
	>
		<header class="flex items-center gap-3">
			<span
				class="w-10 h-10 rounded-btn bg-primary text-primary-content flex items-center justify-center font-bold text-xl"
				aria-hidden="true"
			>
				₹
			</span>
			<div class="flex-1">
				<h2 class="font-bold text-sm">Install Expenses Tracker</h2>
				<p class="text-xs text-base-content/60">Add this PWA to your iPhone Home Screen.</p>
			</div>
			<button
				type="button"
				onclick={() => (show = false)}
				class="btn btn-ghost btn-xs btn-circle self-start"
				aria-label="Close install prompt"
			>
				✕
			</button>
		</header>
		<p
			class="text-xs text-base-content/80 flex items-center flex-wrap gap-1 leading-relaxed bg-base-200 p-3 rounded-box"
		>
			Tap the share button
			<Icon name="share" class="w-4 h-4 text-primary inline mx-1" />
			in Safari, then select
			<strong class="text-primary font-bold">"Add to Home Screen"</strong>
			from the menu list.
		</p>
	</aside>
{/if}
