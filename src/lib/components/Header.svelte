<script lang="ts">
import ThemeToggle from "./ThemeToggle.svelte";

interface Props {
	user: { username: string } | null;
}

let { user }: Props = $props();
</script>

<header class="navbar bg-base-100 px-4 border-b border-base-200">
	<div class="flex-1 flex items-center gap-2">
		<span
			class="w-8 h-8 rounded-(--rounded-btn) bg-primary text-primary-content flex items-center justify-center font-bold text-lg"
			aria-hidden="true"
		>
			₹
		</span>
		<h1 class="text-xl font-bold tracking-tight">Expenses Tracker</h1>
	</div>
	<div class="flex-none flex items-center gap-2">
		<ThemeToggle />
		{#if user}
			<a href="/logout" class="btn btn-ghost btn-sm text-error">Logout</a>
		{/if}
	</div>
</header>
