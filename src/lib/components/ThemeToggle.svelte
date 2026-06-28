<script lang="ts">
import { onMount } from "svelte";
import Icon from "./Icon.svelte";

let isDark = $state(false);

onMount(() => {
	const saved = localStorage.getItem("theme");
	if (saved === "dark") {
		isDark = true;
	} else if (saved === "light") {
		isDark = false;
	} else {
		isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	}
});

function handleToggle() {
	const theme = isDark ? "dark" : "light";
	localStorage.setItem("theme", theme);
	if (theme === "light") {
		document.documentElement.setAttribute("data-theme", "fantasy");
	} else {
		document.documentElement.setAttribute("data-theme", "dracula");
	}
}
</script>

<label class="swap swap-rotate btn btn-ghost btn-circle" aria-label="Toggle theme mode">
	<input type="checkbox" class="sr-only" bind:checked={isDark} onchange={handleToggle}>
	<!-- Moon icon (visible in dark mode) -->
	<Icon name="moon" class="swap-on size-6" />
	<!-- Sun icon (visible in light mode) -->
	<Icon name="sun" class="swap-off size-6" />
</label>
