<script lang="ts">
	import { tick } from 'svelte';

	let {
		alternative,
		isCorrect,
		task,
		onselect
	}: { alternative: number; isCorrect: boolean; task: unknown; onselect: () => void } = $props();

	const correctAnimations = [
		'anim-bounce',
		'anim-tada',
		'anim-spin',
		'anim-jelly',
		'anim-flip',
		'anim-heartbeat',
		'anim-rubber',
		'anim-hop',
		'anim-dance',
		'anim-coinflip'
	];
	const incorrectAnimations = [
		'anim-shake',
		'anim-wobble',
		'anim-squish',
		'anim-buzz',
		'anim-dizzy',
		'anim-droop',
		'anim-deflate'
	];
	const particleEmojis = ['⭐', '✨', '💫', '🌟', '🎉'];

	let faceEl: HTMLElement | undefined = $state(undefined);
	let animation = $state('');
	let feedback = $state('');
	let particles: { id: number; emoji: string; dx: number; dy: number }[] = $state([]);
	let nextParticleId = 0;

	// Restart the CSS animation even when the same class is picked twice in a row
	async function play(name: string, newFeedback: string) {
		animation = '';
		feedback = newFeedback;
		await tick();
		void faceEl?.offsetWidth;
		animation = name;
	}

	$effect(() => {
		task;
		play('anim-pop-in', '');
	});

	function burst() {
		const count = 6;
		const created = Array.from({ length: count }, (_, i) => {
			const angle = (i / count) * 2 * Math.PI + (Math.random() - 0.5);
			const distance = 38 + Math.random() * 26;
			return {
				id: nextParticleId++,
				emoji: particleEmojis[Math.floor(Math.random() * particleEmojis.length)],
				dx: Math.cos(angle) * distance,
				dy: Math.sin(angle) * distance
			};
		});
		particles = [...particles, ...created];
		setTimeout(() => {
			const ids = new Set(created.map((p) => p.id));
			particles = particles.filter((p) => !ids.has(p.id));
		}, 750);
	}

	let lastPlayed = '';

	function pick(pool: string[]) {
		const options = pool.filter((name) => name !== lastPlayed);
		lastPlayed = options[Math.floor(Math.random() * options.length)];
		return lastPlayed;
	}

	function handleClick() {
		const pool = isCorrect ? correctAnimations : incorrectAnimations;
		play(pick(pool), isCorrect ? 'correct' : 'incorrect');
		if (isCorrect) burst();
		onselect();
	}
</script>

<button class="relative h-20 w-20" onclick={handleClick} translate="no">
	<span
		bind:this={faceEl}
		class="face btn btn-white h-full w-full text-3xl font-extrabold {animation} {feedback}"
		onanimationend={() => {
			if (feedback === 'incorrect') feedback = '';
		}}>{alternative}</span
	>
	{#each particles as particle (particle.id)}
		<span
			class="particle"
			style="--dx: {particle.dx}px; --dy: {particle.dy}px"
			aria-hidden="true">{particle.emoji}</span
		>
	{/each}
</button>

<style>
	.face {
		will-change: transform;
	}
	.face.correct {
		border-color: #059669;
		background-color: #10b981;
		color: #fff;
	}
	.face.incorrect {
		border-color: #fda4af;
		background-color: #ffe4e6;
		color: #e11d48;
	}

	.anim-pop-in {
		animation: pop-in 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	.anim-bounce {
		animation: bounce 500ms cubic-bezier(0.28, 0.84, 0.42, 1);
	}
	.anim-tada {
		animation: tada 500ms ease-in-out;
	}
	.anim-spin {
		animation: spin-pop 500ms cubic-bezier(0.34, 1.3, 0.64, 1);
	}
	.anim-jelly {
		animation: jelly 500ms linear;
	}
	.anim-flip {
		animation: flip 500ms ease-in-out;
	}
	.anim-heartbeat {
		animation: heartbeat 500ms ease-in-out;
	}
	.anim-rubber {
		animation: rubber 500ms ease-in-out;
	}
	.anim-hop {
		animation: hop 500ms cubic-bezier(0.28, 0.84, 0.42, 1);
	}
	.anim-dance {
		animation: dance 500ms ease-in-out;
	}
	.anim-coinflip {
		animation: coinflip 500ms ease-in-out;
	}
	.anim-shake {
		animation: shake 450ms ease-in-out;
	}
	.anim-wobble {
		animation: wobble 500ms ease-in-out;
	}
	.anim-squish {
		animation: squish 450ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	.anim-buzz {
		animation: buzz 400ms linear;
	}
	.anim-dizzy {
		animation: dizzy 500ms linear;
	}
	.anim-droop {
		animation: droop 500ms ease-in-out;
	}
	.anim-deflate {
		animation: deflate 450ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes pop-in {
		from {
			transform: scale(0.4);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}
	@keyframes bounce {
		0% {
			transform: scale(1, 1) translateY(0);
		}
		20% {
			transform: scale(1.1, 0.8) translateY(0);
		}
		45% {
			transform: scale(0.95, 1.1) translateY(-16px);
		}
		70% {
			transform: scale(1.05, 0.9) translateY(0);
		}
		100% {
			transform: scale(1, 1) translateY(0);
		}
	}
	@keyframes tada {
		0% {
			transform: scale(1) rotate(0deg);
		}
		15% {
			transform: scale(0.9) rotate(-6deg);
		}
		40% {
			transform: scale(1.15) rotate(6deg);
		}
		60% {
			transform: scale(1.15) rotate(-6deg);
		}
		80% {
			transform: scale(1.1) rotate(4deg);
		}
		100% {
			transform: scale(1) rotate(0deg);
		}
	}
	@keyframes spin-pop {
		0% {
			transform: rotate(0deg) scale(1);
		}
		50% {
			transform: rotate(180deg) scale(1.2);
		}
		100% {
			transform: rotate(360deg) scale(1);
		}
	}
	@keyframes jelly {
		0% {
			transform: scale(1, 1);
		}
		25% {
			transform: scale(0.85, 1.15);
		}
		50% {
			transform: scale(1.15, 0.85);
		}
		75% {
			transform: scale(0.95, 1.05);
		}
		100% {
			transform: scale(1, 1);
		}
	}
	@keyframes flip {
		0% {
			transform: perspective(200px) rotateY(0deg);
		}
		100% {
			transform: perspective(200px) rotateY(360deg);
		}
	}
	@keyframes heartbeat {
		0%,
		100% {
			transform: scale(1);
		}
		20% {
			transform: scale(1.15);
		}
		40% {
			transform: scale(1);
		}
		60% {
			transform: scale(1.22);
		}
		80% {
			transform: scale(0.98);
		}
	}
	@keyframes rubber {
		0% {
			transform: scale(1, 1);
		}
		25% {
			transform: scale(1.3, 0.75);
		}
		45% {
			transform: scale(0.8, 1.2);
		}
		65% {
			transform: scale(1.15, 0.9);
		}
		85% {
			transform: scale(0.95, 1.05);
		}
		100% {
			transform: scale(1, 1);
		}
	}
	@keyframes hop {
		0%,
		100% {
			transform: translateY(0) rotate(0deg);
		}
		25% {
			transform: translateY(-14px) rotate(-8deg);
		}
		50% {
			transform: translateY(0) rotate(0deg);
		}
		75% {
			transform: translateY(-8px) rotate(7deg);
		}
	}
	@keyframes dance {
		0%,
		100% {
			transform: translateX(0) rotate(0deg);
		}
		20% {
			transform: translateX(-6px) rotate(-10deg);
		}
		40% {
			transform: translateX(6px) rotate(10deg);
		}
		60% {
			transform: translateX(-4px) rotate(-7deg);
		}
		80% {
			transform: translateX(4px) rotate(7deg);
		}
	}
	@keyframes coinflip {
		0% {
			transform: perspective(200px) rotateX(0deg);
		}
		100% {
			transform: perspective(200px) rotateX(360deg);
		}
	}
	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		20% {
			transform: translateX(-8px);
		}
		40% {
			transform: translateX(8px);
		}
		60% {
			transform: translateX(-5px);
		}
		80% {
			transform: translateX(5px);
		}
	}
	@keyframes wobble {
		0%,
		100% {
			transform: rotate(0deg);
		}
		25% {
			transform: rotate(-8deg);
		}
		50% {
			transform: rotate(8deg);
		}
		75% {
			transform: rotate(-4deg);
		}
	}
	@keyframes squish {
		0% {
			transform: scale(1, 1);
		}
		40% {
			transform: scale(1.2, 0.6);
		}
		100% {
			transform: scale(1, 1);
		}
	}
	@keyframes buzz {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		10%,
		50%,
		90% {
			transform: translate(-2px, 1px) rotate(-1deg);
		}
		30%,
		70% {
			transform: translate(2px, -1px) rotate(1deg);
		}
	}

	@keyframes dizzy {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		20% {
			transform: translate(4px, -3px) rotate(4deg);
		}
		40% {
			transform: translate(0, -5px) rotate(0deg);
		}
		60% {
			transform: translate(-4px, -3px) rotate(-4deg);
		}
		80% {
			transform: translate(0, 1px) rotate(-2deg);
		}
	}
	@keyframes droop {
		0%,
		100% {
			transform: translateY(0) rotate(0deg) scale(1, 1);
		}
		35% {
			transform: translateY(7px) rotate(-5deg) scale(1, 0.9);
		}
		65% {
			transform: translateY(6px) rotate(-4deg) scale(1, 0.92);
		}
	}
	@keyframes deflate {
		0% {
			transform: scale(1) rotate(0deg);
		}
		40% {
			transform: scale(0.78) rotate(-3deg);
		}
		100% {
			transform: scale(1) rotate(0deg);
		}
	}

	.particle {
		position: absolute;
		left: 50%;
		top: 50%;
		z-index: 30;
		pointer-events: none;
		font-size: 1.25rem;
		animation: fly 700ms ease-out forwards;
	}
	@keyframes fly {
		from {
			transform: translate(-50%, -50%) scale(0.5);
			opacity: 1;
		}
		to {
			transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1.2);
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.face {
			animation: none;
		}
		.particle {
			display: none;
		}
	}
</style>
