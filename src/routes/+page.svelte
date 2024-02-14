<script lang="ts">
	const arithmeticOperations = [
		{ name: 'multiplikasjon', link: 'multiplication' },
		{ name: 'divisjon', link: 'division' }
	];
</script>

<div class="flex flex-col text-center space-y-3">
	<h1 class="text-lg" aria-label="Use links below to select arithmetic operations">
		Velg hva du vil øve på
	</h1>
	{#each arithmeticOperations as operation}
		<a
			class="p-4 border-2 bg-green-300 text-green-950 rounded-md capitalize hover:bg-green-400"
			translate="no"
			href="/{operation.link}">{operation.name}</a
		>
	{/each}
</div>
