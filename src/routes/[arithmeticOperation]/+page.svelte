<script lang="ts">
	import BackButton from '$lib/components/BackButton.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
	import { page } from '$app/stores';

	const times = [0.5, 1, 2, 5, 10, 20];
</script>

<BackButton url={'/'} />

<div class="p-2">
	<div class="pt-7 pb-10 border-2 w-64 align-center justify-center items-center space-y-3">
		<h2 class="text-xl text-center font-bold">Challenge</h2>
		<div class="flex flex-col space-y-2 items-center">
			{#each times as time}
				<a
					href="/{$page.params.arithmeticOperation}/time/{time}"
					class="p-2 border-2 rounded-md w-3/4 hover:scale-110 transition duration-150 ease-in-out"
					>{time === 0.5 ? '30 s' : time + ' minutes'}</a
				>
			{/each}
		</div>
	</div>
</div>
