<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

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
	let answerIsCorrect = $state(false);
	let showResult = $state(false);
	let showSummary = $state(false);
	let showStartOverButton: boolean = $state(false);

	let { timer = 180, selectedMultiplicationTables } = $props();

	let multiplicationTables =
		typeof selectedMultiplicationTables === 'string'
			? selectedMultiplicationTables.split(',').map(Number)
			: (selectedMultiplicationTables = selectedMultiplicationTables);

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

	onMount(async () => {
		const randomIndex: number = Math.floor(Math.random() * multiplicationTables.length);
		A = multiplicationTables[randomIndex];
		B = Math.floor(Math.random() * 8) + 2;
		correctAnswer = A * B;
		trickAnswer1 = A * (B + 1);
		trickAnswer2 = A * (B - 1);
		alternatives = shuffle([correctAnswer, trickAnswer1, trickAnswer2]);
	});

	function sjekkResultat(svar: number) {
		numberOfAnswers++;

		if (correctAnswer == svar) {
			numberOfCorrectAnswers++;

			resultResponseText = 'Congrats, you are doing great!';
			answerIsCorrect = true;
			showResult = true;

			setTimeout(() => {
				const randomIndex: number = Math.floor(Math.random() * multiplicationTables.length);
				A = multiplicationTables[randomIndex];
				B = Math.floor(Math.random() * 8) + 2;
				correctAnswer = A * B;
				trickAnswer1 = A * (B + 1);
				trickAnswer2 = A * (B - 1);
				alternatives = shuffle([correctAnswer, trickAnswer1, trickAnswer2]);
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
	<div class="flex flex-col items-center justify-center space-y-5">
		<div>Congratulations!</div>
		<div>
			You solved {numberOfCorrectAnswers} tasks!
		</div>
		<button
			transition:fade={{ delay: 1500, duration: 300 }}
			class="{showStartOverButton === false
				? 'invisible'
				: ''} p-4 border-2 rounded-md shadow-xl hover:scale-110 z-10"
			on:click={() => {
				goto('/');
			}}>One more time!</button
		>
	</div>
	<ConfettiOnClick />
{:else}
	<div>
		<div class="pb-5 text-center text-2xl">
			{A} · {B}
		</div>

		<div class="text-center text-xl">
			<button
				class="p-4 border-2 rounded-md w-16 hover:scale-110 transition duration-150 ease-in-out"
				value={alternatives[0]}
				on:click={() => sjekkResultat(alternatives[0])}>{alternatives[0]}</button
			>

			<button
				class="p-4 border-2 rounded-md w-16 hover:scale-110 transition duration-150 ease-in-out"
				value={alternatives[1]}
				on:click={() => sjekkResultat(alternatives[1])}>{alternatives[1]}</button
			>

			<button
				class="p-4 border-2 rounded-md w-16 hover:scale-110 transition duration-150 ease-in-out"
				value={alternatives[2]}
				on:click={() => sjekkResultat(alternatives[2])}>{alternatives[2]}</button
			>
		</div>
		<div class="fixed top-5">
			<div class="text-md text-gray-600">
				{Math.floor(timer / 60)}:{Math.floor(timer - Math.floor(timer / 60) * 60)}
			</div>
		</div>
	</div>

	{#if showResult}
		<Modal resultat={resultResponseText} {answerIsCorrect} />
	{/if}
{/if}
