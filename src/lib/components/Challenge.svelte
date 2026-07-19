<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';

	import Modal from '#lib/components/Modal.svelte';
	import { goto } from '$app/navigation';

	import ConfettiOnClick from '#lib/components/ConfettiOnClick.svelte';
	import AnswerButton from '#lib/components/AnswerButton.svelte';
	import GuidedSteps from '#lib/components/GuidedSteps.svelte';

	import { Questions, bigMultiplicationHintLines, type Task } from './utils';

	let resultResponseText = $state('');
	let answerIsCorrect: boolean | undefined = $state(undefined);
	let showResult = $state(false);
	let showSummary = $state(false);
	let numberOfCorrectAnswers = $state(0);

	let showStartOverButton: boolean = $state(false);
	let revealedHints = $state(0);

	let {
		timer = 180,
		selectedTables,
		arithmeticOperation,
		mode = undefined,
		restartUrl = undefined
	}: {
		timer?: number;
		selectedTables: string | number[];
		arithmeticOperation: string;
		mode?: 'easy' | 'hard';
		restartUrl?: string;
	} = $props();
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
		revealedHints = 0;
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

	// Easy mode: score the task once the whole step-by-step wizard is completed
	async function checkGuidedAnswer(correct: boolean, finished: boolean) {
		if (!task) return;
		answerIsCorrect = correct;
		resultResponseText = correct ? randomMessage(correctMessages) : randomMessage(wrongMessages);
		if (!correct) multiplicationTable.incrementIncorrect(task);

		showResult = true;
		await new Promise<void>((resolve) => {
			setTimeout(() => {
				showResult = false;
				resultResponseText = '';
				resolve();
			}, 550);
		});

		if (finished) {
			// Let the completion summary sink in before the next task appears
			await new Promise((resolve) => setTimeout(resolve, 1100));
			multiplicationTable.checkAnswer(task, task.question.answer, Date.now() - taskStartTime);
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
				<div class="text-xs font-semibold tracking-wide text-emerald-700/70 uppercase">
					oppgaver løst
				</div>
			</div>
			<div class="rounded-2xl bg-sky-50 px-3 py-4 text-center">
				<div class="text-3xl font-extrabold text-sky-600">
					{Math.round(numberOfCorrectAnswers / totalTime)}
				</div>
				<div class="text-xs font-semibold tracking-wide text-sky-700/70 uppercase">
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
				goto(restartUrl ?? `/${page.params.arithmeticOperation}`);
			}}>En gang til!</button
		>
		<button
			class="sr-only"
			onclick={() => {
				goto(restartUrl ?? `/${page.params.arithmeticOperation}`);
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
			<div class="absolute top-full left-1/2 z-20 mt-6 w-max -translate-x-1/2">
				<Modal resultat={resultResponseText} {answerIsCorrect} />
			</div>
		{/if}
		<div class="text-center" translate="no" aria-live="assertive" role="presentation">
			<div class="sr-only fixed top-0">
				{#if answerIsCorrect === true}
					riktig
				{:else if answerIsCorrect === false}
					feil
				{/if}
			</div>
			{#if task && mode !== 'easy'}
				<div class="pb-8 text-5xl font-extrabold tracking-wide sm:text-6xl">
					{task.question.A}
					<span class="text-slate-400">
						{#if arithmeticOperation === 'multiplication' || arithmeticOperation === 'big-multiplication'}
							·
						{:else if arithmeticOperation === 'division'}
							:
						{/if}
					</span>
					{task.question.B}
				</div>
			{/if}
		</div>
		{#if task && mode === 'easy'}
			<GuidedSteps {task} onanswer={checkGuidedAnswer} />
		{:else}
			<div class="flex justify-center gap-4 text-center text-xl" translate="no">
				{#if task}
					{#each task.alternatives as alternative, index (index)}
						<AnswerButton
							{alternative}
							{task}
							isCorrect={task.question.answer === alternative}
							onselect={() => checkAnswer(alternative)}
						/>
					{/each}
				{/if}
			</div>
			{#if task && mode === 'hard'}
				{@const hintLines = bigMultiplicationHintLines(task.question.A, task.question.B)}
				<div class="mt-8 flex flex-col items-center gap-3" translate="no">
					{#if revealedHints > 0}
						<div class="card flex flex-col gap-1 px-6 py-4 text-base font-semibold text-slate-500">
							{#each hintLines.slice(0, revealedHints) as line, index (index)}
								<div transition:fade={{ duration: 200 }}>
									<span class="mr-2 font-extrabold text-violet-400">{index + 1}</span>{line}
								</div>
							{/each}
						</div>
					{/if}
					{#if revealedHints < hintLines.length}
						<button
							class="rounded-full border-2 border-slate-200 bg-white/80 px-4 py-1.5 text-sm font-semibold text-slate-500 shadow-xs transition-colors hover:border-violet-300 hover:text-violet-600"
							onclick={() => revealedHints++}
							>💡 {revealedHints === 0 ? 'Vis hint' : 'Neste hint'}</button
						>
					{/if}
				</div>
			{/if}
		{/if}
		<div class="fixed top-4 left-1/2 -translate-x-1/2" aria-hidden="true">
			<div class="flex items-center gap-2">
				<div
					class="rounded-full border-2 border-slate-200 bg-white px-4 py-1 font-bold text-slate-600 tabular-nums shadow-xs"
				>
					{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
				</div>
				{#if numberOfCorrectAnswers > 0}
					<div
						class="rounded-full border-2 border-emerald-200 bg-emerald-50 px-3 py-1 font-bold text-emerald-600 tabular-nums shadow-xs"
					>
						✓ {numberOfCorrectAnswers}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
