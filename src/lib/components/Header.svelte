<script lang="ts">
interface Props {
	user: { username: string } | null;
}

let { user }: Props = $props();
</script>

<header class="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">
	<div class="flex-1 flex items-center gap-2">
		<div
			class="w-8 h-8 rounded-lg bg-primary text-primary-content flex items-center justify-center shadow"
		>
			<span class="font-bold text-lg">₹</span>
		</div>
		<span class="text-xl font-bold tracking-tight">Expenses Tracker</span>
	</div>
	<div class="flex-none gap-2">
		{#if user}
			<span class="text-xs text-base-content/60 hidden sm:inline">{user.username}</span>
			<a href="/logout" class="btn btn-ghost btn-sm text-error">Logout</a>
		{/if}
	</div>
</header>
