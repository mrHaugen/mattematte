<script lang="ts">
	import { Confetti } from 'svelte-confetti';

	const duration = 2000;

	let things: any = [];
	let timeout: any;

	async function moveConfetti(event: any) {
		const { target, clientX, clientY } = event;

		const elementY = target.getBoundingClientRect().top;
		const elementX = target.getBoundingClientRect().left;

		const x = clientX - elementX;
		const y = clientY - elementY;

		things = [...things, { x, y }];

		clearTimeout(timeout);

		timeout = setTimeout(() => (things = []), duration);
	}
</script>

<div class="fixed top-0 h-full w-full" on:mousedown={moveConfetti} aria-hidden="true">
	{#each things as thing}
		<div class="absolute" style="left: {thing.x}px; top: {thing.y}px">
			<Confetti y={[-2, 2]} x={[-2, 2]} fallDistance="50px" amount={70} {duration} />
		</div>
	{/each}
</div>
