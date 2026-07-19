<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';

	import Modal from '#lib/components/Modal.svelte';
	import { goto } from '$app/navigation';

	import ConfettiOnClick from '#lib/components/ConfettiOnClick.svelte';
	import AnswerButton from '#lib/components/AnswerButton.svelte';

	import { Questions, type Task } from './utils';

	let resultResponseText = $state('');
	let answerIsCorrect: boolean | undefined = $state(undefined);
	let showResult = $state(false);
	let showSummary = $state(false);
	let numberOfCorrectAnswers = $state(0);

	let showStartOverButton: boolean = $state(false);

	let {
		timer = 180,
		selectedTables,
		arithmeticOperation
	}: { timer?: number; selectedTables: string | number[]; arithmeticOperation: string } = $props();
	let totalTime = Number(page.params.length);

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

	const correctMessages = [
		'Supert! 🌟',
		'Riktig! 🎉',
		'Du er flink! 😊',
		'Kjempebra! 💪',
		'Wow, så bra! 🤩',
		'Helt riktig! ✨',
		'Du klarte det! 🎈',
		'Knallbra! 🔥',
		'Superflink! ⭐',
		'Bra jobba! 👏',
		'Fantastisk! 🌈',
		'Du er rå! 😎',
		'Midt i blinken! 🎯',
		'Toppen! 🏆',
		'Ja, sånn ja! 🙌',
		'Du kan dette! 🧠',
		'Perfekt! 💯',
		'Så smart du er! 🦉',
		'Juhu, riktig! 🥳',
		'Strålende! ☀️',
		'Du er en stjerne! 🌟',
		'Rett på! 👌',
		'Genialt! 💡',
		'Rakettbra! 🚀',
		'Magisk! 🪄'
	];

	const wrongMessages = [
		'Prøv igjen! 👍',
		'Nesten! Prøv igjen 😊',
		'Oi, prøv igjen! 🙈',
		'Du klarer det! 💪',
		'Ikke gi deg! 🌟',
		'Prøv en gang til! 🍀',
		'Tenk litt til! 🤔',
		'Nære på! 😃',
		'Nytt forsøk! 🎯',
		'Du er snart der! 🐢'
	];

	function randomMessage(messages: string[]) {
		return messages[Math.floor(Math.random() * messages.length)];
	}

	const multiplicationTables: number[] = $derived(
		typeof selectedTables === 'string' ? selectedTables.split(',').map(Number) : selectedTables
	);

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

	// The operation is fixed for the lifetime of a challenge, so the initial value is intended
	// svelte-ignore state_referenced_locally
	const multiplicationTable = new Questions(arithmeticOperation);

	let task: Task | undefined = $state(undefined);
	let taskStartTime: number;

	function getNewTask() {
		task = multiplicationTable.getRandomTask(multiplicationTables);
		taskStartTime = Date.now();
	}

	async function checkAnswer(answer: number) {
		if (!task) return;
		const thinkTime = Date.now() - taskStartTime;
		answerIsCorrect = multiplicationTable.checkAnswer(task, answer, thinkTime);
		resultResponseText = answerIsCorrect
			? randomMessage(correctMessages)
			: randomMessage(wrongMessages);

		showResult = true;

		// Show result for a short time
		await new Promise<void>((resolve) => {
			setTimeout(() => {
				showResult = false;
				resultResponseText = '';
				resolve(); // Resolve the promise after setting showResult to false
			}, 550);
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
		class="card flex w-full max-w-sm flex-col items-center space-y-5 px-6 py-8"
		aria-live="assertive"
		role="presentation"
	>
		<div class="text-center text-2xl font-extrabold">
			{encouragingFeedback[Math.floor(Math.random() * encouragingFeedback.length)]}
		</div>
		<div class="grid w-full grid-cols-2 gap-3">
			<div class="rounded-2xl bg-emerald-50 px-3 py-4 text-center">
				<div class="text-3xl font-extrabold text-emerald-600">{numberOfCorrectAnswers}</div>
				<div class="text-xs font-semibold uppercase tracking-wide text-emerald-700/70">
					oppgaver løst
				</div>
			</div>
			<div class="rounded-2xl bg-sky-50 px-3 py-4 text-center">
				<div class="text-3xl font-extrabold text-sky-600">
					{Math.round(numberOfCorrectAnswers / totalTime)}
				</div>
				<div class="text-xs font-semibold uppercase tracking-wide text-sky-700/70">
					riktige i minuttet
				</div>
			</div>
		</div>
		<button
			aria-hidden="true"
			transition:fade={{ delay: 2500, duration: 300 }}
			class="{showStartOverButton === false
				? 'invisible'
				: ''} btn btn-primary z-10 w-full py-3 text-xl"
			onclick={() => {
				goto(`/${page.params.arithmeticOperation}`);
			}}>En gang til!</button
		>
		<button
			class="sr-only"
			onclick={() => {
				goto(`/${page.params.arithmeticOperation}`);
			}}>En gang til!</button
		>
		<div class="pt-4 text-center text-sm text-slate-400" aria-hidden="true">
			{Math.random() > 0.2
				? 'Pro tips: Trykk for å kaste konfetti 🥳'
				: 'Pro tips: Velg 2 minutter challenge og øv mens du pusser tenner 🪥 🦷'}
		</div>
	</div>
	<ConfettiOnClick />
{:else}
	<div class="relative">
		{#if showResult}
			<div class="absolute left-1/2 top-full z-20 mt-6 w-max -translate-x-1/2">
				<Modal resultat={resultResponseText} {answerIsCorrect} />
			</div>
		{/if}
		<div class="pb-8 text-center" translate="no" aria-live="assertive" role="presentation">
			<div class="fixed top-0 sr-only">
				{#if answerIsCorrect === true}
					riktig
				{:else if answerIsCorrect === false}
					feil
				{/if}
			</div>
			<div class="text-5xl font-extrabold tracking-wide sm:text-6xl">
				{#if task}
					{task.question.A}
					<span class="text-slate-400">
						{#if arithmeticOperation === 'multiplication'}
							·
						{:else if arithmeticOperation === 'division'}
							:
						{/if}
					</span>
					{task.question.B}
				{/if}
			</div>
		</div>
		<div class="flex justify-center gap-4 text-center text-xl" translate="no">
			{#if task}
				{#each task.alternatives as alternative}
					<AnswerButton
						{alternative}
						{task}
						isCorrect={task.question.answer === alternative}
						onselect={() => checkAnswer(alternative)}
					/>
				{/each}
			{/if}
		</div>
		<div class="fixed left-1/2 top-4 -translate-x-1/2" aria-hidden="true">
			<div class="flex items-center gap-2">
				<div
					class="rounded-full border-2 border-slate-200 bg-white px-4 py-1 font-bold tabular-nums text-slate-600 shadow-sm"
				>
					{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
				</div>
				{#if numberOfCorrectAnswers > 0}
					<div
						class="rounded-full border-2 border-emerald-200 bg-emerald-50 px-3 py-1 font-bold tabular-nums text-emerald-600 shadow-sm"
					>
						✓ {numberOfCorrectAnswers}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
