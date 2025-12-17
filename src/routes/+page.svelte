<script lang="ts">
	import Code from '$lib/components/layout/code.svelte';
	import Workspace from '$lib/components/layout/workspace.svelte';
	import { BookOpen } from '@lucide/svelte';
</script>

<main class="flex h-screen w-screen overflow-hidden bg-base-100">
	<Code />
	<Workspace />

	<!-- Docs Link -->
	<a
		href="/docs"
		class="btn absolute right-6 bottom-6 z-50 btn-circle shadow-lg transition-transform btn-neutral hover:scale-110"
		title="Documentation"
	>
		<BookOpen size={20} />
	</a>
</main>
