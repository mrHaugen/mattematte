<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	import Modal from '$lib/components/Modal.svelte';
	import { goto } from '$app/navigation';

	import ConfettiOnClick from '$lib/components/ConfettiOnClick.svelte';

	let A: number | undefined = $state(undefined);
	let B: number | undefined = $state(undefined);
	let correctAnswer: number;
	let trickAnswer1;
	let trickAnswer2;
	let alternatives: number[] = $state([]);
	let numberOfAnswers: number = 0;
	let numberOfCorrectAnswers: number = $state(0);
	let resultResponseText = $state('');
	let answerIsCorrect: boolean | undefined = $state(undefined);
	let showResult = $state(false);
	let showSummary = $state(false);
	let showStartOverButton: boolean = $state(false);

	let { timer = 180, selectedTables, arithmeticOperation } = $props();
	let totalTime = $page.params.length;

	let multiplicationTables =
		typeof selectedTables === 'string'
			? selectedTables.split(',').map(Number)
			: (selectedTables = selectedTables);

	let countdownTimer = setInterval(() => {
		if (timer > 0) {
			timer--;
		} else {
			showSummary = true;
			let showStartOverButtonTimer = setInterval(() => {
				showStartOverButton = true;
				clearInterval(showStartOverButtonTimer);
			}, 1000);
			clearInterval(countdownTimer);
		}
	}, 1000);

	function createNewTask() {
		const randomIndex: number = Math.floor(Math.random() * multiplicationTables.length);
		A = multiplicationTables[randomIndex];
		B = Math.floor(Math.random() * 8) + 2;
		// Randomly decide whether to add or subtract
		const addOrSubtract = Math.random() < 0.5 ? 1 : -1;
		switch (arithmeticOperation) {
			case 'multiplication':
				correctAnswer = A * B;
				trickAnswer1 = A * (B + addOrSubtract) > 0 ? A * (B + addOrSubtract) : 1;
				trickAnswer2 = A * (B + 2 * addOrSubtract) > 0 ? A * (B + 2 * addOrSubtract) : 1;
				break;
			case 'division':
				correctAnswer = B;
				trickAnswer1 = B + addOrSubtract;
				trickAnswer2 = B + 2 * addOrSubtract;
				break;
			default:
				break;
		}
		alternatives = shuffle([correctAnswer, trickAnswer1, trickAnswer2]);
	}

	onMount(async () => {
		createNewTask();
	});

	function sjekkResultat(svar: number) {
		numberOfAnswers++;

		if (correctAnswer == svar) {
			numberOfCorrectAnswers++;

			resultResponseText = 'Congrats, you are doing great!';
			answerIsCorrect = true;
			showResult = true;

			setTimeout(() => {
				createNewTask();
				svar = 0;
				showResult = false;
				resultResponseText = '';
			}, 500);
		} else {
			resultResponseText = 'Try again :)';
			answerIsCorrect = false;
			showResult = true;
			setTimeout(() => {
				showResult = false;
				resultResponseText = '';
			}, 1000);
		}
	}

	function shuffle(array: number[]) {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}
</script>

{#if showSummary}
	<div
		class="flex flex-col items-center justify-center space-y-5"
		aria-live="assertive"
		role="presentation"
	>
		<div class="text-center">Congratulations!</div>
		<div class="text-center">
			You solved {numberOfCorrectAnswers} tasks!
		</div>
		<div class="text-center">
			That's an astonishing {Math.round(numberOfCorrectAnswers / totalTime)} correct answers per minute!
		</div>
		<button
			aria-hidden="true"
			transition:fade={{ delay: 2500, duration: 300 }}
			class="{showStartOverButton === false
				? 'invisible'
				: ''} p-4 border-2 rounded-md shadow-xl hover:scale-110 z-10"
			on:click={() => {
				goto(`/${$page.params.arithmeticOperation}`);
			}}>One more time!</button
		>
		<button
			class="sr-only"
			on:click={() => {
				goto(`/${$page.params.arithmeticOperation}`);
			}}>One more time!</button
		>
		<div class="pt-10 text-center text-sm text-gray-500" aria-hidden="true">
			Pro tip: click anywhere to throw confetti 🥳
		</div>
	</div>
	<ConfettiOnClick />
{:else}
	<div>
		<div class="pb-5 text-center text-2xl" translate="no" aria-live="assertive" role="presentation">
			<div class="fixed top-0 sr-only">
				{#if answerIsCorrect === true}
					correct
				{:else if answerIsCorrect === false}
					wrong
				{/if}
			</div>
			<div>
				{#if arithmeticOperation === 'multiplication'}
					{A} · {B}
				{:else if arithmeticOperation === 'division'}
					{A * B} : {A}
				{/if}
			</div>
		</div>

		<div class="text-center text-xl" translate="no">
			<button
				class="p-4 border-2 rounded-md w-16 md:hover:scale-110 transition duration-150 ease-in-out"
				value={alternatives[0]}
				on:click={() => sjekkResultat(alternatives[0])}>{alternatives[0]}</button
			>

			<button
				class="p-4 border-2 rounded-md w-16 md:hover:scale-110 transition duration-150 ease-in-out"
				value={alternatives[1]}
				on:click={() => sjekkResultat(alternatives[1])}>{alternatives[1]}</button
			>

			<button
				class="p-4 border-2 rounded-md w-16 md:hover:scale-110 transition duration-150 ease-in-out"
				value={alternatives[2]}
				on:click={() => sjekkResultat(alternatives[2])}>{alternatives[2]}</button
			>
		</div>
		<div class="fixed top-4 right-20 mx-auto" aria-hidden="true">
			<div class="text-md text-gray-600">
				{Math.floor(timer / 60)}:{Math.floor(timer - Math.floor(timer / 60) * 60)}
			</div>
		</div>
	</div>

	{#if showResult}
		<Modal resultat={resultResponseText} {answerIsCorrect} />
	{/if}
{/if}
