<script lang="ts">
	import { page } from '$app/state';
	import { browser } from '$app/env';

	import Challenge from '#lib/components/Challenge.svelte';
	import BackButton from '#lib/components/BackButton.svelte';

	let challengeIsStarted: boolean = $state(false);
	const timer = Number(page.params.length) * 60;
	const mode: 'easy' | 'hard' = page.params.mode === 'lett' ? 'easy' : 'hard';

	function startChallange() {
		challengeIsStarted = true;
	}

	const tablesArray = [
		{ name: 'eleven', value: 11 },
		{ name: 'twelve', value: 12 },
		{ name: 'thirteen', value: 13 },
		{ name: 'fourteen', value: 14 },
		{ name: 'fifteen', value: 15 },
		{ name: 'sixteen', value: 16 },
		{ name: 'seventeen', value: 17 },
		{ name: 'eighteen', value: 18 },
		{ name: 'nineteen', value: 19 }
	];

	let storedValue = (browser && localStorage.getItem('selectedBigMultiplicationTables')) || [];
	let selectedTables = $state(storedValue);

	$effect(() => {
		localStorage.selectedBigMultiplicationTables = selectedTables;
	});
</script>

<BackButton url={`/big-multiplication/${page.params.mode}`} />

{#if challengeIsStarted === true}
	<Challenge
		{timer}
		{selectedTables}
		arithmeticOperation="big-multiplication"
		{mode}
		restartUrl={`/big-multiplication/${page.params.mode}`}
	/>
{:else}
	<div class="flex w-full max-w-sm flex-col items-center">
		<h1
			class="text-center text-2xl font-extrabold"
			aria-label="Use checkboxes below to select tables to practise. Start excercise with start-button at bottom."
		>
			Velg tabeller
		</h1>
		<p class="mt-1 text-center text-sm font-semibold text-slate-400">
			Hvilke tabeller vil du øve på?
		</p>
		<div class="grid grid-cols-3 gap-3 py-8">
			{#each tablesArray as table (table.value)}
				<label for={table.name} class="cursor-pointer">
					<input
						bind:group={selectedTables}
						value={table.value}
						id={table.name}
						aria-describedby="the ${table.name} times table"
						name={table.name}
						type="checkbox"
						class="peer sr-only"
					/>
					<span
						aria-hidden="true"
						class="btn btn-white flex h-20 w-20 text-3xl font-extrabold text-slate-400 peer-checked:border-emerald-600 peer-checked:bg-emerald-500 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500 peer-focus-visible:ring-offset-2 peer-checked:hover:bg-emerald-400"
						>{table.value}</span
					>
				</label>
			{/each}
		</div>

		<button
			class="btn btn-primary w-full py-3 text-xl"
			disabled={selectedTables.length === 0}
			onclick={() => startChallange()}>Start</button
		>
	</div>
{/if}
