<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { browser } from '$app/env';

	import Challenge from '#lib/components/Challenge.svelte';
	import BackButton from '#lib/components/BackButton.svelte';

	let challengeIsStarted: boolean = $state(false);
	let timer: number;
	const arithmeticOperation = page.params.arithmeticOperation ?? '';
	const arithmeticOperationCapitilized =
		arithmeticOperation.charAt(0).toUpperCase() + arithmeticOperation.slice(1);

	function startChallange() {
		challengeIsStarted = true;
	}

	const tablesArray = [
		{ name: 'one', value: 1 },
		{ name: 'two', value: 2 },
		{ name: 'three', value: 3 },
		{ name: 'four', value: 4 },
		{ name: 'five', value: 5 },
		{ name: 'six', value: 6 },
		{ name: 'seven', value: 7 },
		{ name: 'eight', value: 8 },
		{ name: 'nine', value: 9 }
	];

	let storedValue =
		(browser && localStorage.getItem(`selected${arithmeticOperationCapitilized}Tables`)) || [];
	let selectedTables = $state(storedValue);

	$effect(() => {
		switch (arithmeticOperation) {
			case 'multiplication':
				localStorage.selectedMultiplicationTables = selectedTables;
				break;
			case 'division':
				localStorage.selectedDivisionTables = selectedTables;
				break;
			default:
				break;
		}
	});

	onMount(() => {
		timer = Number(page.params.length) * 60;
	});
</script>

<BackButton url={`/${arithmeticOperation}`} />

{#if challengeIsStarted === true}
	<Challenge {timer} {selectedTables} {arithmeticOperation} />
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
			{#each tablesArray as table}
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
						class="btn btn-white flex h-20 w-20 text-3xl font-extrabold text-slate-400 peer-checked:border-emerald-600 peer-checked:bg-emerald-500 peer-checked:text-white peer-checked:hover:bg-emerald-400 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500 peer-focus-visible:ring-offset-2"
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
