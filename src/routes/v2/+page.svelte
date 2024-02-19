<script lang="ts">
	import { Questions } from './utils';
	import { onMount } from 'svelte';

	let selectedTables = [2, 3, 4, 5, 6, 7, 8, 9];

	let arithmeticOperation = 'multiplication';
	const multiplicationTable = new Questions(arithmeticOperation);

	let task = $state(undefined);
	let taskStartTime: number;

	function getNewTask() {
		task = multiplicationTable.getRandomTask(selectedTables);
		taskStartTime = Date.now();
	}

	function checkAnswer(answer) {
		const thinkTime = Date.now() - taskStartTime;
		const answerIsCorrect = multiplicationTable.checkAnswer(task, answer, thinkTime);
		if (answerIsCorrect) {
			getNewTask();
		}
	}

	onMount(() => {
		getNewTask();
	});
</script>

<div class="flex flex-col">
	<div>Questions</div>
	{#if task}
		<div>
			{task.question.A}
			{#if arithmeticOperation === 'multiplication'}
				·
			{:else if arithmeticOperation === 'division'}
				:
			{/if}
			{task.question.B}
		</div>
		<div class="flex flex-row">
			{#each task.alternatives as alternative, index}
				<button class="p-4 border-2 rounded-md w-16 h-16" onclick={() => checkAnswer(alternative)}
					>{alternative}</button
				>
			{/each}
		</div>
	{/if}
</div>
