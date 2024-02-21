<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	import Modal from '$lib/components/Modal.svelte';
	import { goto } from '$app/navigation';

	import ConfettiOnClick from '$lib/components/ConfettiOnClick.svelte';

	import { Questions } from './utils';

	let resultResponseText = $state('');
	let answerIsCorrect: boolean | undefined = $state(undefined);
	let showResult = $state(false);
	let showSummary = $state(false);
	let numberOfCorrectAnswers = $state(0);

	let showStartOverButton: boolean = $state(false);

	let { timer = 180, selectedTables, arithmeticOperation } = $props();
	let totalTime = $page.params.length;

	const encouragingFeedback = [
		'Fantastisk jobb! 👏',
		'Godt jobbet, superstjerne! 🌟',
		'Kjempebra jobbet! 🎉',
		'Du er fantastisk! 🌈',
		'Bravo! 👍',
		'Utrolig innsats! 💪',
		'Superb! 🎈',
		'Bra gjort! 🚀',
		'Utmerket! 🎊',
		'Fantastisk! 🌻',
		'Fortsett det gode arbeidet! 🌟',
		'Du klarte det! 🔥',
		'Utmerket jobb! 👌',
		'Du er en rockestjerne! 🎸',
		'Utmerket prestasjon! 🏆',
		'Bra gjort, kompis! 👏',
		'Bemerkelsesverdig innsats! 💯',
		'Du er rå! 🔥',
		'Spektakulært arbeid! 🌟',
		'Du er en stjerne! ⭐️',
		'Fantastisk jobb! 💫',
		'Imponerende! 😎',
		'Du gjør at det ser lett ut! 😊',
		'Du er en mester! 🏅',
		'Topp innsats! 🎖️'
	];

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

	const multiplicationTable = new Questions(arithmeticOperation);

	let task = $state(undefined);
	let taskStartTime: number;

	function getNewTask() {
		task = multiplicationTable.getRandomTask(multiplicationTables);
		taskStartTime = Date.now();
	}

	async function checkAnswer(answer) {
		const thinkTime = Date.now() - taskStartTime;
		answerIsCorrect = multiplicationTable.checkAnswer(task, answer, thinkTime);
		resultResponseText = answerIsCorrect ? 'Supert, du er flink!' : 'Prøv igjen 👍';

		showResult = true;

		// Show result for a short time
		await new Promise((resolve) => {
			setTimeout(() => {
				showResult = false;
				resultResponseText = '';
				resolve(); // Resolve the promise after setting showResult to false
			}, 400);
		});

		if (answerIsCorrect) {
			numberOfCorrectAnswers++;
			getNewTask();
		}
	}

	onMount(() => {
		getNewTask();
	});
</script>

{#if showSummary}
	<div
		class="flex flex-col items-center justify-center space-y-5"
		aria-live="assertive"
		role="presentation"
	>
		<div class="text-center text-xl font-medium">
			{encouragingFeedback[Math.floor(Math.random() * encouragingFeedback.length)]}
		</div>
		<div class="text-center">
			Du løste {numberOfCorrectAnswers} oppgaver!
		</div>
		<div class="text-center">
			Det er {Math.round(numberOfCorrectAnswers / totalTime)} riktige svar i minuttet!
		</div>
		<button
			aria-hidden="true"
			transition:fade={{ delay: 2500, duration: 300 }}
			class="{showStartOverButton === false
				? 'invisible'
				: ''} p-4 border-2 rounded-md shadow-xl hover:scale-110 z-10"
			on:click={() => {
				goto(`/${$page.params.arithmeticOperation}`);
			}}>En gang til!</button
		>
		<button
			class="sr-only"
			on:click={() => {
				goto(`/${$page.params.arithmeticOperation}`);
			}}>En gang til!</button
		>
		<div class="pt-10 text-center text-sm text-gray-500" aria-hidden="true">
			{Math.random() > 0.2
				? 'Pro tips: Trykk for å kaste konfetti 🥳'
				: 'Pro tips: Velg 2 minutter challenge og øv mens du pusser tenner 🪥 🦷'}
		</div>
	</div>
	<ConfettiOnClick />
{:else}
	<div>
		<div class="pb-5 text-center text-2xl" translate="no" aria-live="assertive" role="presentation">
			<div class="fixed top-0 sr-only">
				{#if answerIsCorrect === true}
					riktig
				{:else if answerIsCorrect === false}
					feil
				{/if}
			</div>
			<div>
				{#if task}
					{task.question.A}
					{#if arithmeticOperation === 'multiplication'}
						·
					{:else if arithmeticOperation === 'division'}
						:
					{/if}
					{task.question.B}
				{/if}
			</div>
		</div>
		<div class="text-center text-xl space-x-3" translate="no">
			{#if task}
				{#each task.alternatives as alternative, index}
					<button class="p-4 border-2 rounded-md w-16 h-16" onclick={() => checkAnswer(alternative)}
						>{alternative}</button
					>
				{/each}
			{/if}
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
