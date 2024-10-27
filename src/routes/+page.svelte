<script lang="ts">
	const arithmeticOperations = [
		{ name: 'multiplikasjon', link: 'multiplication' },
		{ name: 'divisjon', link: 'division' }
	];
</script>

<div class="flex flex-col text-center space-y-3 w-full md:w-1/3 lg:w-1/4">
	<h1 class="text-lg" aria-label="Use links below to select arithmetic operations">
		Hva vil du øve på?
	</h1>
	{#each arithmeticOperations as operation}
		<a
			class="flex items-center justify-center  p-4 h-14 bg-green-300 text-green-950 rounded-md capitalize hover:bg-green-400"
			translate="no"
			href="/{operation.link}">{operation.name}</a
		>
	{/each}
</div>

<div class="fixed bottom-0 py-5 text-gray-500 text-sm">
	<span>Spørsmål? Kontakt oss på</span> <a class="hover:underline" href="mailto:post@1618.no">post@1618.no</a>
</div>
