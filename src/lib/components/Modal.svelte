<script lang="ts">
	export let resultat: string;
	export let answerIsCorrect: boolean;
	import HappySmileIcon from '$lib/icons/HappySmileIcon.svg?raw';
	import SadSmileIcon from '$lib/icons/SadSmileIcon.svg?raw';
</script>

<div
	class="relative top-0 z-10"
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
	aria-hidden="true"
>
	<div class="fixed inset-0 bg-gray-500 bg-opacity-0 transition-opacity"></div>
	<div
		class="w-full overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6"
	>
		<div>
			{#if answerIsCorrect}
				<div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
					{@html HappySmileIcon}
				</div>
			{:else}
				<div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
					{@html SadSmileIcon}
				</div>
			{/if}
			<div class="mt-3 text-center sm:mt-5">
				<h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
					{resultat}
				</h3>
			</div>
		</div>
	</div>
</div>
