<script lang="ts">
	let { url } = $props();
</script>

<div class="absolute left-3 top-3 z-10" aria-hidden="true">
	<a
		class="flex flex-row items-center gap-1.5 rounded-full border-2 border-slate-200 bg-white/80 px-3 py-1.5 text-sm font-semibold text-slate-500 shadow-xs backdrop-blur-sm transition-colors hover:border-slate-300 hover:text-slate-700"
		href={url}
		><svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-move-left"><path d="M6 8L2 12L6 16" /><path d="M2 12H22" /></svg
		>
		<span> Tilbake </span>
	</a>
</div>
