<script lang="ts">
	let { url } = $props();
</script>

<div class="absolute top-2 left-2 p-2 z-10" aria-hidden="true">
	<a class="flex flex-row space-x-2 text-gray-500" href={url}
		><svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-move-left"><path d="M6 8L2 12L6 16" /><path d="M2 12H22" /></svg
		>
		<span> Back </span>
	</a>
</div>
