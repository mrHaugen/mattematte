<script lang="ts">
	import { Confetti } from 'svelte-confetti';

	const duration = 2000;

	let things: { id: number; x: number; y: number }[] = $state([]);
	let timeout: ReturnType<typeof setTimeout> | undefined;
	let nextId = 0;

	function moveConfetti(event: MouseEvent) {
		const target = event.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();

		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		things = [...things, { id: nextId++, x, y }];

		clearTimeout(timeout);

		timeout = setTimeout(() => (things = []), duration);
	}
</script>

<div class="fixed top-0 h-full w-full" onmousedown={moveConfetti} aria-hidden="true">
	{#each things as thing (thing.id)}
		<div class="absolute" style="left: {thing.x}px; top: {thing.y}px">
			<Confetti y={[-2, 2]} x={[-2, 2]} fallDistance="50px" amount={70} {duration} />
		</div>
	{/each}
</div>
