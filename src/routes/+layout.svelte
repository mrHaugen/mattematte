<script>
	import '../app.pcss';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<script defer data-domain="mattematte.no" src="https://plausible.io/js/script.js"></script>
</svelte:head>

<div class="p-2">
	{#if $page.params.arithmeticOperation}
		<a class="flex flex-row space-x-2 text-gray-500" href=".."
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
	{/if}
	<div class="flex h-screen items-center justify-center px-2">
		<slot />
	</div>
</div>
