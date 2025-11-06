<script lang="ts">
	import Code from '$lib/components/layout/code.svelte';
	import { codeEditor } from '$lib/stores/code.store';
	import { slideshow } from '$lib/stores/slides.store';
	import type { Slide } from '$lib/types/slideshow.type';
	import { fade } from 'svelte/transition';

	let page = $state(1);
	let slide: Slide = $derived($slideshow.slides[page - 1]);

	function onkeydown(event: KeyboardEvent) {
		if (document.activeElement === $codeEditor) return;

		if (event.key === 'ArrowLeft') {
			page = page === 1 ? $slideshow.slides.length : page - 1;
			slide = $slideshow.slides[page - 1];
		} else if (event.key === 'ArrowRight') {
			page = page === $slideshow.slides.length ? 1 : page + 1;
			slide = $slideshow.slides[page - 1];
		}
	}
</script>

<svelte:window {onkeydown} />

<main class="flex min-h-screen flex-col">
	<div class="flex flex-1">
		<Code />
		<div class="relative flex flex-2 items-center justify-center bg-neutral-100 px-4">
			<h1 class="absolute top-0 right-0 p-4 text-2xl font-bold">
				{$slideshow.title || 'Slideshow'}
			</h1>
			{#if slide}
				<div class="relative aspect-video w-full max-w-3xl bg-white shadow-xl">
					<p>{slide.title}</p>
					{#each slide.objects as object (object.name)}
						<div
							in:fade
							out:fade
							class="absolute top-1/2 left-1/2 grid -translate-1/2 place-items-center transition-all duration-500"
							title={object.name}
							style:transform="translate({object.posX}px, {object.posY}px)"
							style:width={object.type === 'text' ? '' : `${object.w}px`}
							style:height={object.type === 'text' ? '' : `${object.h}px`}
							style:font-size={object.type === 'text' ? `${object.w}pt` : ''}
							style:font-weight={object.type === 'text' ? `${object.h}` : ''}
							style:background-color={object.type === 'text' ? '' : object.color}
							style:color={object.type === 'text' ? object.color : ''}
							style:border-radius={object.type === 'circle' ? '50%' : ''}
						>
							{object.type === 'text' ? object.name : ''}
						</div>
					{/each}
				</div>
			{/if}

			<div class="absolute bottom-0 left-0 flex gap-4 p-4">
				<button
					onclick={() => {
						page = page === 1 ? $slideshow.slides.length : page - 1;
						slide = $slideshow.slides[page - 1];
					}}
				>
					Prev
				</button>
				<p>{page} / {$slideshow.slides.length || 1}</p>
				<button
					onclick={() => {
						page = page === $slideshow.slides.length ? 1 : page + 1;
						slide = $slideshow.slides[page - 1];
					}}
				>
					Next
				</button>
			</div>
		</div>
	</div>
</main>
