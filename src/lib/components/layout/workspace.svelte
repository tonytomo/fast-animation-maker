<script lang="ts">
	import { slideshow } from '$lib/stores/slides.store';
	import { nextPage, toggleFullscreen, prevPage, workspace } from '$lib/stores/workspace.store';
	import type { Slide } from '$lib/types/slideshow.type';
	import { getAlign, getHeight, getPosition, getRounded, getWidth } from '$lib/utils/object';
	import { fade } from 'svelte/transition';

	let slide: Slide = $derived($slideshow.slides[$workspace.page - 1]);
</script>

<div
	class="relative flex h-screen w-screen flex-2 items-center justify-center bg-neutral-100"
	style:padding-inline={$workspace.fullscreen ? '0' : '1rem'}
>
	{#if !$workspace.fullscreen}
		<h1 class="absolute top-0 right-0 p-4 text-2xl font-bold">
			{$slideshow.title || 'Slideshow'}
		</h1>
	{/if}
	{#if slide}
		<div
			bind:offsetHeight={$workspace.height}
			class="relative aspect-video max-h-full w-full overflow-hidden border transition-colors duration-200 ease-in-out"
			style:background={slide.color}
			style:z-index={$workspace.fullscreen ? '40' : '0'}
			style:max-width={$workspace.fullscreen ? '100%' : '768px'}
		>
			<p>{slide.title}</p>
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

	<div class="absolute bottom-0 left-0 flex gap-4 p-4">
		<button onclick={prevPage}> Prev </button>
		<p>{$workspace.page} / {$slideshow.slides.length || 1}</p>
		<button onclick={() => nextPage($slideshow.slides.length)}> Next </button>

		<button onclick={toggleFullscreen} class="z-50">
			{$workspace.fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
		</button>
	</div>
</div>
