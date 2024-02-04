<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	import Challenge from '$lib/components/Challenge.svelte';

	let challengeIsStarted: boolean = false;
	let timer: number;

	function startChallange() {
		challengeIsStarted = true;
	}

	onMount(() => {
		timer = Number($page.params.length) * 60;
	});
</script>

{#if challengeIsStarted === true}
	<Challenge {timer} />
{:else}
	<button
		class="bg-green-300 py-3 px-2 border-2 w-64 rounded-md text-xl hover:scale-110 transition duration-150 ease-in-out"
		on:click={() => startChallange()}>Start</button
	>
{/if}
