<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
</script>

<svelte:head>
	<title>Login - Notion Expenses Tracker</title>
</svelte:head>

<main class="hero min-h-screen bg-base-300">
	<div class="hero-content text-center">
		<section class="max-w-md card bg-base-100 border border-base-200 rounded-box">
			<div class="card-body p-8 sm:p-10 flex flex-col items-center">
				<!-- App Logo / Icon -->
				<span
					class="w-16 h-16 rounded-btn bg-primary text-primary-content flex items-center justify-center mb-6"
					aria-hidden="true"
				>
					<Icon name="rupee" class="size-9" />
				</span>

				<h1 class="text-3xl font-extrabold tracking-tight mb-2 text-base-content">Expenses PWA</h1>
				<p class="text-base-content/60 text-sm mb-8 max-w-xs">
					A fast, installable tracker connected directly to your Notion database.
				</p>

				<!-- GitHub Auth Button -->
				<a href="/login/github" class="btn btn-primary btn-block gap-3">
					<!-- GitHub Icon -->
					<Icon name="github" class="size-5" />
					Login with GitHub
				</a>
			</div>
		</section>
	</div>
</main>
