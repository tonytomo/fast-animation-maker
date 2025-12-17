<script lang="ts">
	import Code from '$lib/components/layout/code.svelte';
	import Workspace from '$lib/components/layout/workspace.svelte';
	import { codeEditor } from '$lib/stores/code.store';
	import { slideshow } from '$lib/stores/slides.store';
	import { prevPage, nextPage, toggleFullscreen } from '$lib/stores/workspace.store';

	function onkeydown(event: KeyboardEvent) {
		if (document.activeElement === $codeEditor) return;

		if (event.key === 'f') toggleFullscreen();
		else if (event.key === 'ArrowLeft') prevPage();
		else if (event.key === 'ArrowRight') nextPage($slideshow.slides.length);
	}
</script>

<svelte:window {onkeydown} />

<main class="flex min-h-screen flex-col">
	<div class="flex flex-1">
		<Code />
		<Workspace />
	</div>
</main>
