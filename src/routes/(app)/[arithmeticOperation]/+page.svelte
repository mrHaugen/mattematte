<script lang="ts">
	import BackButton from '#lib/components/BackButton.svelte';

	import { page } from '$app/state';

	const times = [0.5, 1, 2, 5, 10, 20];

	function timeLabel(time: number): { value: string; unit: string } {
		if (time === 0.5) return { value: '30', unit: 'sekunder' };
		return { value: String(time), unit: time === 1 ? 'minutt' : 'minutter' };
	}
</script>

<BackButton url="/" />

<div class="w-full max-w-sm">
	<h1
		class="text-center text-2xl font-extrabold"
		aria-label="Use links below to select duration of excercise"
	>
		Challenge
	</h1>
	<p class="mt-1 mb-6 text-center text-sm font-semibold text-slate-400">Hvor lenge vil du øve?</p>

	<div class="grid grid-cols-2 gap-3">
		{#each times as time (time)}
			<a href="/{page.params.arithmeticOperation}/time/{time}" class="btn btn-white flex-col py-4">
				<span class="text-3xl font-extrabold">{timeLabel(time).value}</span>
				<span class="text-xs font-semibold tracking-wide text-slate-400 uppercase"
					>{timeLabel(time).unit}</span
				>
			</a>
		{/each}
	</div>
</div>
