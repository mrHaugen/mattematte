<script lang="ts">
	import BackButton from '#lib/components/BackButton.svelte';

	const modes = [
		{
			name: 'Lett',
			slug: 'lett',
			description: 'Løs oppgaven steg for steg med hjelp',
			emoji: '🌱',
			badge: 'bg-emerald-100',
			hover: 'hover:border-emerald-300 hover:bg-emerald-50'
		},
		{
			name: 'Vanskelig',
			slug: 'vanskelig',
			description: 'Uten hjelp – men du kan be om hint',
			emoji: '🔥',
			badge: 'bg-rose-100',
			hover: 'hover:border-rose-300 hover:bg-rose-50'
		}
	];
</script>

<BackButton url="/" />

<div class="w-full max-w-sm pt-12">
	<h1
		class="text-center text-2xl font-extrabold"
		aria-label="Use links below to select difficulty level"
	>
		Den store multiplikasjonstabellen
	</h1>
	<p class="mt-1 mb-6 text-center text-sm font-semibold text-slate-400">
		Multiplikasjon med 11 til 19 – velg nivå
	</p>

	<div class="flex flex-col space-y-3">
		{#each modes as mode (mode.slug)}
			<a
				class="btn btn-white {mode.hover} group gap-4 p-4 text-left"
				translate="no"
				href="/big-multiplication/{mode.slug}"
			>
				<span
					class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl {mode.badge}"
					aria-hidden="true">{mode.emoji}</span
				>
				<span class="flex-1">
					<span class="block text-lg font-bold">{mode.name}</span>
					<span class="block text-xs font-semibold text-slate-400">{mode.description}</span>
				</span>
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
