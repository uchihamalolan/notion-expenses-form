<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
</script>

<svelte:head>
	<title>Login - Notion Expenses Tracker</title>
</svelte:head>

<div class="hero min-h-screen bg-base-300">
	<div class="hero-content text-center">
		<div class="max-w-md card bg-base-100 shadow-2xl border border-base-200">
			<div class="card-body p-8 sm:p-10 flex flex-col items-center">
				<!-- App Logo / Icon -->
				<div
					class="w-16 h-16 rounded-2xl bg-primary text-primary-content flex items-center justify-center shadow-lg shadow-primary/20 mb-6"
				>
					<Icon name="rupee" class="w-9 h-9" />
				</div>

				<h1 class="text-3xl font-extrabold tracking-tight mb-2 text-base-content">Expenses PWA</h1>
				<p class="text-base-content/60 text-sm mb-8 max-w-xs">
					A fast, installable tracker connected directly to your Notion database.
				</p>

				<!-- GitHub Auth Button -->
				<a
					href="/login/github"
					class="btn btn-primary btn-block gap-3 text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
				>
					<!-- GitHub Icon -->
					<Icon name="github" class="w-5 h-5 fill-current" />
					Login with GitHub
				</a>
			</div>
		</div>
	</div>
</div>
