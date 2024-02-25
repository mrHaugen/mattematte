<script lang="ts">
	import { Rive } from '@rive-app/canvas';
	import { onMount } from 'svelte';

	let { alternative, index, answerIsCorrect, task } = $props();

	let riveInstance: any = $state(undefined);
	let filePrefix = $derived.by(() => {
		task = task;
		return answerIsCorrect ? 'correct' : 'incorrect';
	});

	$effect.pre(() => {
		task = task;
		if (riveInstance && riveInstance.artboard) {
			updatealternatives();
		}
	});

	function updatealternatives() {
		riveInstance.setTextRunValue('Alternative', alternative.toString());
		riveInstance.play('idle');
	}

	onMount(() => {
		const canvasEl: HTMLCanvasElement | OffscreenCanvas = document.getElementById(
			`rive-canvas-${index}`
		)!;
		riveInstance = new Rive({
			src: '/answerButtonAnimations.riv',
			canvas: canvasEl,
			shouldDisableRiveListeners: true,
			autoplay: false,
			onLoad: () => {
				riveInstance.resizeDrawingSurfaceToCanvas();
				//	riveInstance.setTextRunValue('Alternative', alternative.toString());
				updatealternatives();
			}
		});
		canvasEl.addEventListener('click', () => playAnimation(), { passive: true });
		canvasEl.addEventListener('touchstart', () => playAnimation(), { passive: true });
		//updatealternatives();
	});

	async function playAnimation() {
		let animations = [...riveInstance.animationNames.filter((name) => name.startsWith(filePrefix))];
		const numberOfAnimations = animations.length;
		const random = Math.floor(Math.random() * numberOfAnimations);
		const randomAnimation = animations[random];
		riveInstance.play(randomAnimation);
	}
</script>

<canvas id={`rive-canvas-${index}`} class="h-full w-full" />
