<script lang="ts">
	import {
		code,
		codeEditor,
		loadFromLocalStorage,
		saveToLocalStorage
	} from '$lib/stores/code.store';
	import { workspace } from '$lib/stores/workspace.store';
	import { onMount } from 'svelte';
	import FileCode from '@lucide/svelte/icons/file-code';
	import PanelLeftClose from '@lucide/svelte/icons/panel-left-close';
	import PanelLeftOpen from '@lucide/svelte/icons/panel-left-open';

	let show = $state(true);
	let debounce: NodeJS.Timeout;

	onMount(() => {
		const storedCode = loadFromLocalStorage();
		code.set(storedCode);
	});

	function onkeydown(event: KeyboardEvent) {
		const isInput =
			event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement;

		// Allow toggle with Ctrl+\ (or Cmd+\) even when focused, or just \ when not focused
		if (event.key === '\\') {
			if (event.ctrlKey || event.metaKey || !isInput) {
				event.preventDefault();
				toggle();
			}
		}
	}

	function oninput(e: Event) {
		clearTimeout(debounce);

		debounce = setTimeout(() => {
			const value = (e.target as HTMLTextAreaElement).value;
			code.set(value);
			saveToLocalStorage(value);
		}, 300);
	}

	function toggle() {
		show = !show;

		if (show) {
			setTimeout(() => {
				if ($codeEditor) $codeEditor.focus();
			}, 10);
		}
	}
</script>

<svelte:window {onkeydown} />

{#if !$workspace.fullscreen}
	<div
		class="relative z-10 flex h-full flex-col border-r border-base-300 bg-base-100 transition-all duration-300 ease-in-out"
		class:w-full={show}
		class:w-0={!show}
		class:md:max-w-md={show}
		class:overflow-hidden={!show}
	>
		<!-- Header -->
		<div
			class="flex h-12 w-full items-center justify-between border-b border-base-300 bg-base-100 px-4"
			class:opacity-0={!show}
		>
			<div class="flex items-center gap-2 text-sm font-bold text-base-content/70">
				<FileCode size={16} />
				<span>SCRIPT</span>
			</div>
			<div class="flex items-center gap-2">
				<kbd class="kbd font-mono text-xs kbd-sm">Ctrl + \</kbd>
				<button class="btn btn-square btn-ghost btn-xs" onclick={toggle}>
					<PanelLeftClose size={16} />
				</button>
			</div>
		</div>

		<!-- Editor Area -->
		<div class="relative flex-1 bg-base-100 p-0">
			<div class="absolute inset-0">
				<textarea
					disabled={!show}
					value={$code}
					bind:this={$codeEditor}
					{oninput}
					class="size-full resize-none bg-transparent p-4 font-mono text-sm leading-6 focus:outline-none"
					placeholder="// Type your animation script here..."
					spellcheck="false"
				></textarea>
			</div>
		</div>
	</div>

	<!-- Collapsed Toggle Button -->
	{#if !show}
		<button
			onclick={toggle}
			class="btn absolute top-3 left-4 z-50 btn-circle shadow-lg btn-sm btn-primary"
			title="Open Editor (Ctrl + \)"
		>
			<PanelLeftOpen size={16} />
		</button>
	{/if}
{/if}
