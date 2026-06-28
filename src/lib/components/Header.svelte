<script lang="ts">
import Icon from "./Icon.svelte";
import ThemeToggle from "./ThemeToggle.svelte";

interface Props {
	user: { username: string } | null;
}

let { user }: Props = $props();
</script>

<header class="navbar bg-base-100 px-4 border-b border-base-200 min-h-14">
	<!-- Logo (always visible) -->
	<div class="navbar-start">
		<a href="/" class="flex items-center gap-2 hover:opacity-85 transition-opacity">
			<span
				class="w-8 h-8 rounded-full bg-primary text-primary-content place-center font-bold text-lg shrink-0"
				aria-hidden="true"
			>
				₹
			</span>
			<h1 class="text-xl font-bold tracking-tight">
				<span class="hidden sm:inline">Expenses Tracker</span>
				<span class="sm:hidden">Tracker</span>
			</h1>
		</a>
	</div>

	<!-- Desktop nav (sm+) -->
	{#if user}
		<nav class="navbar-center hidden sm:flex items-center gap-5 text-sm font-semibold opacity-80">
			<a href="/" class="hover:text-primary transition-colors">Expenses</a>
			<a href="/templates" class="hover:text-primary transition-colors">Templates</a>
		</nav>
	{/if}

	<!-- Right side: theme toggle + avatar (desktop) + hamburger (mobile) -->
	<div class="navbar-end flex items-center gap-1">
		<ThemeToggle />

		{#if user}
			<!-- Avatar dropdown (always visible on right on desktop, hidden on mobile) -->
			<details class="dropdown dropdown-end hidden sm:block">
				<summary class="btn btn-ghost btn-circle avatar">
					<div class="rounded-full w-8">
						<img src="https://github.com/{user.username}.png" alt="{user.username}'s avatar">
					</div>
				</summary>
				<ul
					tabindex="-1"
					class="menu dropdown-content bg-base-100 rounded-box z-20 mt-2 w-32 p-2 shadow border border-base-200"
				>
					<li><a href="/logout" class="text-error">Logout</a></li>
				</ul>
			</details>

			<!-- Hamburger dropdown (mobile only) -->
			<details class="dropdown dropdown-end sm:hidden">
				<summary class="btn btn-ghost btn-circle" aria-label="Open navigation menu">
					<Icon name="menu" class="size-5" />
				</summary>
				<ul
					tabindex="-1"
					class="menu dropdown-content bg-base-100 rounded-box z-20 mt-2 w-44 p-2 shadow border border-base-200"
				>
					<li><a href="/">Expenses</a></li>
					<li><a href="/templates">Templates</a></li>
					<span class="divider my-0.5"></span>
					<li>
						<div class="flex items-center gap-2">
							<div class="rounded-full w-6 h-6 overflow-hidden shrink-0">
								<img src="https://github.com/{user.username}.png" alt="{user.username}'s avatar">
							</div>
							<span class="text-sm truncate">{user.username}</span>
						</div>
					</li>
					<li><a href="/logout" class="text-error">Logout</a></li>
				</ul>
			</details>
		{/if}
	</div>
</header>
