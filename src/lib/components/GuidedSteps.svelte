<script lang="ts">
	import AnswerButton from '#lib/components/AnswerButton.svelte';
	import { generateGuidedSteps, type GuidedStep, type PromptPart, type Task } from './utils';

	let { task, onanswer }: { task: Task; onanswer: (correct: boolean, finished: boolean) => void } =
		$props();

	let stepIndex = $state(0);
	let completed = $state(false);
	const steps: GuidedStep[] = $derived(generateGuidedSteps(task.question.A, task.question.B));
	const step: GuidedStep = $derived(steps[stepIndex]);
	const lastDigitA = $derived(task.question.A % 10);
	const lastDigitB = $derived(task.question.B % 10);

	$effect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions -- start at step one for every new task
		task;
		stepIndex = 0;
		completed = false;
	});

	function pick(alternative: number) {
		const correct = alternative === step.answer;
		const finished = correct && stepIndex === steps.length - 1;
		if (finished) completed = true;
		onanswer(correct, finished);
		if (correct && !finished) {
			// Wait for the feedback modal before revealing the next step
			setTimeout(() => {
				stepIndex++;
			}, 550);
		}
	}

	function partClass(color: PromptPart['color']) {
		if (color === 'a') return 'text-violet-500';
		if (color === 'b') return 'text-amber-500';
		if (color === 'result') return 'text-emerald-600';
		return '';
	}
</script>

<div class="flex flex-col items-center gap-4" translate="no">
	<!-- The task itself, with the digits used in the current step colored like the step -->
	<div class="pb-4 text-5xl font-extrabold tracking-wide sm:text-6xl">
		<span class={!completed && step.highlightA === 'full' ? 'text-violet-500' : ''}
			>1<span class={!completed && step.highlightA === 'last' ? 'text-violet-500' : ''}
				>{lastDigitA}</span
			></span
		>
		<span class="text-slate-400">·</span>
		<span
			>1<span class={!completed && step.highlightB === 'last' ? 'text-amber-500' : ''}
				>{lastDigitB}</span
			></span
		>
	</div>

	{#if completed}
		<div class="completion flex flex-col items-center gap-3">
			<div class="flex items-center gap-1.5" aria-hidden="true">
				{#each steps, index (index)}
					<span class="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
				{/each}
			</div>
			<div class="card flex flex-col items-center px-8 py-5">
				<div class="text-4xl" aria-hidden="true">🎉</div>
				<div class="mt-2 text-3xl font-extrabold text-emerald-600">
					{task.question.A} · {task.question.B} = {task.question.answer}
				</div>
				<div class="mt-1 text-sm font-semibold text-slate-400">Alle steg fullført!</div>
			</div>
		</div>
	{:else}
		<div class="flex items-center gap-1.5" aria-label="Steg {stepIndex + 1} av {steps.length}">
			{#each steps, index (index)}
				<span
					class="h-2.5 w-2.5 rounded-full {index < stepIndex
						? 'bg-emerald-400'
						: index === stepIndex
							? 'bg-violet-400'
							: 'bg-slate-200'}"
				></span>
			{/each}
		</div>

		{#if stepIndex > 0}
			<div class="flex flex-col items-center gap-0.5 text-sm font-semibold text-slate-400">
				{#each steps.slice(0, stepIndex) as done (done.prompt)}
					<div>{done.prompt} = <span class="text-emerald-600">{done.answer}</span></div>
				{/each}
			</div>
		{/if}

		<div class="card px-6 py-4 text-center">
			<div class="text-xs font-bold tracking-wide text-slate-400 uppercase">{step.title}</div>
			<div class="mt-1 text-3xl font-extrabold">
				{#each step.parts as part, index (index)}<span class={partClass(part.color)}
						>{part.text}</span
					>{/each} = ?
			</div>
		</div>

		<div class="flex justify-center gap-4 text-center text-xl">
			{#each step.alternatives as alternative, index (`${stepIndex}-${index}`)}
				<AnswerButton
					{alternative}
					task={step}
					isCorrect={step.answer === alternative}
					onselect={() => pick(alternative)}
				/>
			{/each}
		</div>
	{/if}
</div>

<style>
	.completion {
		animation: pop-in 350ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes pop-in {
		from {
			transform: scale(0.5);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.completion {
			animation: none;
		}
	}
</style>
