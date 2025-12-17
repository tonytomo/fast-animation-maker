<script lang="ts">
	import {
		code,
		codeEditor,
		loadFromLocalStorage,
		saveToLocalStorage
	} from '$lib/stores/code.store';
	import { workspace } from '$lib/stores/workspace.store';
	import { onMount } from 'svelte';

	let show = $state(true);
	let width = $state('w-full');
	let padding = $state('p-4');
	let debounce: NodeJS.Timeout;

	onMount(() => {
		const storedCode = loadFromLocalStorage();
		code.set(storedCode);
	});

	function onkeydown(event: KeyboardEvent) {
		if (event.key === '\\') {
			toggle();
		}
	}

	function oninput(e: Event) {
		clearTimeout(debounce);

		debounce = setTimeout(() => {
			code.set((e.target as HTMLTextAreaElement).value);
			saveToLocalStorage((e.target as HTMLTextAreaElement).value);
		}, 50);
	}

	function toggle() {
		show = !show;
		width = show ? 'w-full' : 'w-0';
		padding = show ? 'p-4' : 'p-0';

		if (show) {
			setTimeout(() => {
				if ($codeEditor) $codeEditor.focus();
			}, 10);
		}
	}
</script>

<svelte:window {onkeydown} />

{#if !$workspace.fullscreen}
	<div class="absolute left-0 z-10 h-full transition-all md:max-w-md lg:static lg:h-auto {width}">
		<div class="relative size-full bg-white {padding}">
			<textarea
				disabled={!show}
				defaultValue={$code}
				bind:this={$codeEditor}
				{oninput}
				class="size-full resize-none focus:outline-none"
			></textarea>
			<button onclick={toggle} class="absolute top-0 right-0 z-5 translate-x-full bg-blue-400 p-2">
				Toggle
			</button>
		</div>
	</div>
{/if}
