<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	//import type { PageData } from './$types';
	//export let data: PageData;

	import Challenge from '$lib/components/Challenge.svelte';

	let challengeIsStarted: boolean = $state(false);
	let timer: number;

	function startChallange() {
		challengeIsStarted = true;
	}

	const multiplicationTablesArray = [
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

	let storedValue = (browser && localStorage.getItem('selectedMultiplicationTables')) || [];
	let selectedMultiplicationTables = $state(storedValue);

	$effect(() => {
		localStorage.selectedMultiplicationTables = selectedMultiplicationTables;
	});

	onMount(() => {
		timer = Number($page.params.length) * 60;
	});
</script>

{#if challengeIsStarted === true}
	<Challenge {timer} {selectedMultiplicationTables} />
{:else}
	<div>
		<div class="flex flex-col items-center border-2 rounded-md pt-5 px-5 mb-6">
			<div class="text-center">Multiplication table(s)<br /> to practice</div>
			<div class="py-8 space-y-4">
				{#each multiplicationTablesArray as multiplication}
					<div class="relative flex items-start">
						<div class="mr-3 text-sm leading-6">
							<label for={multiplication.name} class="font-medium text-gray-900"
								>{multiplication.value}</label
							>
						</div>
						<div class="flex h-6 items-center">
							<!-- <label for="hs-basic-usage" class="sr-only">switch</label> -->
							<input
								bind:group={selectedMultiplicationTables}
								value={multiplication.value}
								id={multiplication.name}
								aria-describedby="the ${multiplication.name} times table"
								name={multiplication.name}
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
			class="bg-green-300 py-3 px-2 border-2 w-64 rounded-md text-xl hover:scale-110 transition duration-150 ease-in-out disabled:hover:scale-100 disabled:bg-gray-50 disabled:text-gray-300"
			disabled={selectedMultiplicationTables.length === 0}
			on:click={() => startChallange()}>Start</button
		>
	</div>
{/if}
