<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	import Challenge from '$lib/components/Challenge.svelte';
	import BackButton from '$lib/components/BackButton.svelte';

	let challengeIsStarted: boolean = $state(false);
	let timer: number;
	const arithmeticOperation = $page.params.arithmeticOperation;
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
		timer = Number($page.params.length) * 60;
	});
</script>

<BackButton url={`/${arithmeticOperation}`} />

{#if challengeIsStarted === true}
	<Challenge {timer} {selectedTables} {arithmeticOperation} />
{:else}
	<div>
		<div class="flex flex-col items-center border-2 rounded-md pt-5 px-5 mb-6">
			<h1
				class="text-center"
				aria-label="Use checkboxes below to select tables to practise. Start excercise with start-button at bottom."
			>
				Velg tabeller å øve på
			</h1>
			<div class="py-8 space-y-4">
				{#each tablesArray as table}
					<div class="relative flex items-start">
						<div class="mr-3 text-sm leading-6">
							<label for={table.name} class="font-medium text-gray-900">{table.value}</label>
						</div>
						<div class="flex h-6 items-center">
							<!-- <label for="hs-basic-usage" class="sr-only">switch</label> -->
							<input
								bind:group={selectedTables}
								value={table.value}
								id={table.name}
								aria-describedby="the ${table.name} times table"
								name={table.name}
								type="checkbox"
								class="
								relative w-11 h-6 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600
								before:inline-block before:w-5 before:h-5 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200
							"
							/>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<button
			class="bg-green-300 py-3 px-2 border-2 w-full rounded-md text-xl hover:scale-110 transition duration-150 ease-in-out disabled:hover:scale-100 disabled:bg-gray-50 disabled:text-gray-300"
			disabled={selectedTables.length === 0}
			onclick={() => startChallange()}>Start</button
		>
	</div>
{/if}
