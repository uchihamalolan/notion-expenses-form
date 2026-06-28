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
			class="w-8 h-8 rounded-full bg-primary text-primary-content place-center font-bold text-lg"
			aria-hidden="true"
		>
			₹
		</span>
		<h1 class="text-xl font-bold tracking-tight">Expenses Tracker</h1>
	</div>
	<div class="flex-none flex items-center gap-2">
		<ThemeToggle />
		{#if user}
			<details class="dropdown dropdown-end">
				<summary class="btn btn-ghost btn-circle avatar">
					<div class="rounded-full w-8">
						<img src="https://github.com/{user.username}.png" alt="{user.username}'s avatar">
					</div>
				</summary>
				<ul
					tabindex="-1"
					class="menu dropdown-content bg-base-100 rounded-box z-20 mt-2 w-32 p-2 shadow border border-base-200"
				>
					<li>
						<a href="/logout" class="text-error"> Logout </a>
					</li>
				</ul>
			</details>
		{/if}
	</div>
</header>
