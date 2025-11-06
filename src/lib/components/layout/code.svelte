<script lang="ts">
	import { code, codeEditor } from '$lib/stores/code.store';

	let show = $state(true);
	let width = $state('w-full');
	let padding = $state('p-4');

	function onkeydown(event: KeyboardEvent) {
		if (event.key === '/') {
			toggle();
		}
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

<div class="absolute left-0 z-10 h-full transition-all md:max-w-md lg:static lg:h-auto {width}">
	<div class="relative size-full bg-white {padding}">
		<textarea
			disabled={!show}
			bind:this={$codeEditor}
			bind:value={$code}
			class="size-full resize-none focus:outline-none"
		></textarea>
		<button onclick={toggle} class="absolute top-0 right-0 z-5 translate-x-full bg-blue-400 p-2">
			Toggle
		</button>
	</div>
</div>
