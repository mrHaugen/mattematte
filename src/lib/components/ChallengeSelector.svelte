<script lang="ts">
	import { goto } from '$app/navigation';

	function selectChallenge(challengeLengthInMinutes: number) {
		goto(`/multiplication/time/${challengeLengthInMinutes}`);
	}
</script>

<div class="p-2">
	<div class="pt-7 pb-10 border-2 w-64 align-center justify-center items-center space-y-3">
		<h2 class="text-xl text-center font-bold">Challenge</h2>
		<div class="flex flex-col space-y-2 items-center">
			<button
				onclick={() => selectChallenge(0.5)}
				class="p-2 border-2 rounded-md w-3/4 hover:scale-110 transition duration-150 ease-in-out"
				>30 s</button
			>
			<button
				onclick={() => selectChallenge(1)}
				class="p-2 border-2 rounded-md w-3/4 hover:scale-110 transition duration-150 ease-in-out"
				>1 min</button
			>
			<button
				onclick={() => selectChallenge(2)}
				class="p-2 border-2 rounded-md w-3/4 hover:scale-110 transition duration-150 ease-in-out"
				>2 min</button
			>
			<button
				onclick={() => selectChallenge(5)}
				class="p-2 border-2 rounded-md w-3/4 hover:scale-110 transition duration-150 ease-in-out"
				>5 min</button
			>
			<button
				onclick={() => selectChallenge(10)}
				class="p-2 border-2 rounded-md w-3/4 hover:scale-110 transition duration-150 ease-in-out"
				>10 min</button
			>
			<button
				onclick={() => selectChallenge(20)}
				class="p-2 border-2 rounded-md w-3/4 hover:scale-110 transition duration-150 ease-in-out"
				>20 min</button
			>
		</div>
	</div>
</div>
