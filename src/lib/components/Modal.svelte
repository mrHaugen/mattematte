<script lang="ts">
	import HappySmileIcon from '#lib/icons/HappySmileIcon.svg?raw';
	import SadSmileIcon from '#lib/icons/SadSmileIcon.svg?raw';

	let { resultat, answerIsCorrect }: { resultat: string; answerIsCorrect: boolean | undefined } =
		$props();
</script>

<div
	class="relative top-0 z-10"
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
	aria-hidden="true"
>
	<div
		class="flex items-center gap-3 rounded-2xl border-2 px-5 py-3 shadow-lg {answerIsCorrect
			? 'border-emerald-200 bg-emerald-50'
			: 'border-rose-200 bg-rose-50'}"
	>
		{#if answerIsCorrect}
			<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -- static bundled SVG -->
				{@html HappySmileIcon}
			</div>
		{:else}
			<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-100">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -- static bundled SVG -->
				{@html SadSmileIcon}
			</div>
		{/if}
		<h3
			class="text-base font-bold whitespace-nowrap {answerIsCorrect
				? 'text-emerald-800'
				: 'text-rose-800'}"
			id="modal-title"
		>
			{resultat}
		</h3>
	</div>
</div>
