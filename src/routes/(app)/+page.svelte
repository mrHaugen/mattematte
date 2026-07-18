<script lang="ts">
	const arithmeticOperations = [
		{
			name: 'multiplikasjon',
			link: 'multiplication',
			symbol: '×',
			badge: 'bg-amber-100 text-amber-600',
			hover: 'hover:border-amber-300 hover:bg-amber-50'
		},
		{
			name: 'divisjon',
			link: 'division',
			symbol: '÷',
			badge: 'bg-sky-100 text-sky-600',
			hover: 'hover:border-sky-300 hover:bg-sky-50'
		}
	];
</script>

<div class="flex w-full max-w-sm flex-col text-center">
	<div class="mb-8" translate="no">
		<div class="text-4xl font-extrabold tracking-tight">
			matte<span class="text-emerald-500">matte</span><span class="text-slate-400">.no</span>
		</div>
		<div class="mt-1 text-sm font-semibold text-slate-400">Bli knallgod i gangetabellen!</div>
	</div>

	<h1
		class="mb-4 text-lg font-bold text-slate-600"
		aria-label="Use links below to select arithmetic operations"
	>
		Hva vil du øve på?
	</h1>

	<div class="flex flex-col space-y-3">
		{#each arithmeticOperations as operation}
			<a
				class="btn btn-white {operation.hover} group gap-4 p-4 text-left"
				translate="no"
				href="/{operation.link}"
			>
				<span
					class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-3xl font-extrabold {operation.badge}"
					aria-hidden="true">{operation.symbol}</span
				>
				<span class="flex-1 text-lg font-bold capitalize">{operation.name}</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="text-slate-300 transition-transform group-hover:translate-x-1"
					aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg
				>
			</a>
		{/each}
	</div>
</div>

<div class="fixed bottom-0 flex flex-col py-5 text-center text-sm text-slate-400">
	<a class="font-semibold underline decoration-slate-300 underline-offset-4 hover:text-slate-600" href="/om"
		>Om mattematte.no</a
	>
</div>
