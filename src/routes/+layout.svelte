<script>
	import '../app.pcss';
</script>

<svelte:head>
	<script defer data-domain="mattematte.no" src="https://plausible.io/js/script.js"></script>
	<title>mattematte.no</title>
</svelte:head>

<div class="flex flex-col h-screen items-center justify-center px-2">
	<slot />
</div>
