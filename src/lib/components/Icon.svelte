<script lang="ts">
import { ICON_DATA } from "$lib/icons";

interface Props {
	name: keyof typeof ICON_DATA;
	class?: string;
}

let { name, class: className = "w-6 h-6" }: Props = $props();

const icon = $derived(ICON_DATA[name]);
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class={className}
	viewBox={icon.viewBox}
	fill={icon.fill}
	stroke={icon.stroke}
	stroke-width={icon.strokeWidth}
>
	<title>{name}</title>
	{@html icon.content}
</svg>
