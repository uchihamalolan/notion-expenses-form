<script lang="ts">
import Icon from "./Icon.svelte";

interface Props {
	message: { type: "success" | "error"; text: string } | null;
}

let { message }: Props = $props();
</script>

{#if message}
	<aside class="toast toast-top toast-center">
		<output class="alert {message.type === 'success' ? 'alert-success' : 'alert-error'}">
			<Icon name={message.type} />
			<span>{message.text}</span>
		</output>
	</aside>
{/if}
