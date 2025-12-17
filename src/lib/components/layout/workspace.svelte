<script lang="ts">
	import { slideshow } from '$lib/stores/slides.store';
	import { nextPage, toggleFullscreen, prevPage, workspace } from '$lib/stores/workspace.store';
	import type { Slide } from '$lib/types/slideshow.type';
	import { getAlign, getHeight, getPosition, getRounded, getWidth } from '$lib/utils/object';
	import { fade } from 'svelte/transition';
	import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from '@lucide/svelte';

	let slide: Slide = $derived($slideshow.slides[$workspace.page - 1]);
	let containerWidth = $state(0);
	let containerHeight = $state(0);

	let slideDims = $derived.by(() => {
		const hPadding = $workspace.fullscreen ? 0 : 64; // Increased padding for better aesthetics
		const vPadding = $workspace.fullscreen ? 0 : 64;
		const availW = containerWidth - hPadding;
		const availH = containerHeight - vPadding;

		if (!availW || !availH) return { w: 0, h: 0 };

		const ratio = 16 / 9;
		let w = availW;
		let h = w / ratio;

		if (h > availH) {
			h = availH;
			w = h * ratio;
		}

		return { w, h };
	});

	function onkeydown(event: KeyboardEvent) {
		const isInput =
			event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement;
		if (isInput) return;

		if (event.key === 'ArrowRight' || event.key === ' ') {
			nextPage($slideshow.slides.length);
		} else if (event.key === 'ArrowLeft') {
			prevPage();
		} else if (event.key === 'f') {
			toggleFullscreen();
		}
	}
</script>

<svelte:window {onkeydown} />

<div
	bind:clientWidth={containerWidth}
	bind:clientHeight={containerHeight}
	class="relative flex h-full w-full min-w-0 flex-1 items-center justify-center bg-base-200 transition-all"
	style:padding-inline={$workspace.fullscreen ? '0' : '1rem'}
>
	<!-- Dot Pattern Background -->
	{#if !$workspace.fullscreen}
		<div
			class="absolute inset-0 opacity-[0.2]"
			style="background-image: radial-gradient(#000000 1px, transparent 1px); background-size: 20px 20px;"
		></div>
	{/if}

	{#if !$workspace.fullscreen}
		<h1
			class="absolute top-6 right-8 text-3xl font-black tracking-tight text-base-content/20 select-none"
		>
			{$slideshow.title || 'Untitled'}
		</h1>
	{/if}
	{#if slide}
		<div
			bind:offsetHeight={$workspace.height}
			class="relative overflow-hidden bg-white shadow-2xl transition-all duration-300 ease-out"
			class:rounded-xl={!$workspace.fullscreen}
			class:border={!$workspace.fullscreen}
			class:border-base-300={!$workspace.fullscreen}
			style:width={`${slideDims.w}px`}
			style:height={`${slideDims.h}px`}
			style:background={slide.color}
			style:z-index={$workspace.fullscreen ? '40' : '10'}
		>
			{#if !$workspace.fullscreen}
				<div class="pointer-events-none absolute top-0 left-0 z-50 p-6">
					<span
						class="inline-block rounded-full border border-white/10 bg-black/40 px-4 py-1.5 text-xs font-medium tracking-wide text-white/90 shadow-sm backdrop-blur-md"
					>
						{slide.title}
					</span>
				</div>
			{/if}
			{#each slide.objects as object, i (object.id || i)}
				{#if object.type === 'text'}
					<p
						in:fade
						out:fade
						class="absolute z-5 -translate-1/2 font-body transition-all duration-200 ease-in-out"
						style:inset={getPosition(object)}
						style:font-size={`${(object.size / 40) * $workspace.height}px`}
						style:font-weight={`${object.weight * 100}`}
						style:color={object.color}
					>
						{object.text}
					</p>
				{:else}
					<div
						in:fade
						out:fade
						title={object.id}
						class="absolute transition-all duration-400 ease-in-out"
						style:inset={getPosition(object)}
						style:transform={getAlign(object)}
						style:width={getWidth(object)}
						style:height={getHeight(object)}
						style:aspect-ratio={object.height ? 'auto' : '1/1'}
						style:background={object.background}
						style:border-radius={object.type === 'circle' ? '50%' : getRounded(object)}
					></div>
				{/if}
			{/each}
		</div>
	{/if}

	<!-- Floating Control Dock -->
	<div
		class="absolute bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-black/80 px-4 py-2 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/90"
		class:opacity-0={$workspace.fullscreen}
		class:hover:opacity-100={$workspace.fullscreen}
	>
		<button
			class="btn btn-circle text-white btn-ghost btn-sm hover:bg-white/20"
			onclick={prevPage}
			aria-label="Previous Slide"
		>
			<ChevronLeft size={18} />
		</button>

		<span class="px-2 font-mono text-xs font-medium tracking-widest text-white/70">
			{$workspace.page} / {$slideshow.slides.length || 1}
		</span>

		<button
			class="btn btn-circle text-white btn-ghost btn-sm hover:bg-white/20"
			onclick={() => nextPage($slideshow.slides.length)}
			aria-label="Next Slide"
		>
			<ChevronRight size={18} />
		</button>

		<div class="mx-2 h-4 w-px bg-white/20"></div>

		<button
			class="btn btn-circle text-white btn-ghost btn-sm hover:bg-white/20"
			onclick={toggleFullscreen}
			aria-label="Toggle Fullscreen"
		>
			{#if $workspace.fullscreen}
				<Minimize2 size={16} />
			{:else}
				<Maximize2 size={16} />
			{/if}
		</button>
	</div>
</div>
