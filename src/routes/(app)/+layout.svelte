<script>
	let { children } = $props();
</script>

<div class="relative flex h-svh w-full flex-col items-center justify-center overflow-hidden px-4">
	<div class="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
		<span
			class="absolute top-[12%] left-[8%] rotate-[-12deg] text-6xl font-extrabold text-amber-200/60"
			>×</span
		>
		<span
			class="absolute top-[20%] right-[10%] rotate-[10deg] text-5xl font-extrabold text-sky-200/70"
			>÷</span
		>
		<span
			class="absolute bottom-[18%] left-[12%] rotate-[8deg] text-5xl font-extrabold text-emerald-200/60"
			>=</span
		>
		<span
			class="absolute right-[8%] bottom-[10%] rotate-[-8deg] text-6xl font-extrabold text-rose-200/50"
			>?</span
		>
	</div>
	<div class="relative z-[1] flex w-full flex-col items-center">
		{@render children()}
	</div>
</div>
