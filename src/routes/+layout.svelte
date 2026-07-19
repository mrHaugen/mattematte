<script>
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<script defer data-domain="mattematte.no" src="https://plausible.io/js/script.js"></script>
	<title>mattematte.no</title>
</svelte:head>

{@render children()}
