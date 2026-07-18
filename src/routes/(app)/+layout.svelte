<div class="relative flex h-svh w-full flex-col items-center justify-center overflow-hidden px-4">
	<div class="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
		<span class="absolute left-[8%] top-[12%] rotate-[-12deg] text-6xl font-extrabold text-amber-200/60">×</span>
		<span class="absolute right-[10%] top-[20%] rotate-[10deg] text-5xl font-extrabold text-sky-200/70">÷</span>
		<span class="absolute bottom-[18%] left-[12%] rotate-[8deg] text-5xl font-extrabold text-emerald-200/60">=</span>
		<span class="absolute bottom-[10%] right-[8%] rotate-[-8deg] text-6xl font-extrabold text-rose-200/50">?</span>
	</div>
	<div class="relative z-[1] flex w-full flex-col items-center">
		<slot />
	</div>
</div>
