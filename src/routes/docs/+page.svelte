<script lang="ts">
	import { resolve } from '$app/paths';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import Copy from '@lucide/svelte/icons/copy';
	import Check from '@lucide/svelte/icons/check';
	import Tv from '@lucide/svelte/icons/tv';
	import Play from '@lucide/svelte/icons/play';
	import Box from '@lucide/svelte/icons/box';

	let copied = $state('');

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
		copied = text;
		setTimeout(() => (copied = ''), 2000);
	}

	const sections = [
		{ id: 'basics', title: 'The Basics' },
		{ id: 'objects', title: 'Adding Objects' },
		{ id: 'animation', title: 'Animation Magic' },
		{ id: 'cheatsheet', title: 'Cheat Sheet' }
	];
</script>

<div
	class="min-h-screen bg-base-100 font-sans text-base-content selection:bg-primary selection:text-primary-content"
>
	<!-- Navbar -->
	<nav class="sticky top-0 z-50 w-full border-b border-base-300 bg-base-100/80 backdrop-blur-md">
		<div class="container mx-auto flex h-16 items-center justify-between px-6">
			<div class="flex items-center gap-3">
				<a
					href={resolve('/')}
					class="btn gap-2 text-base-content/70 btn-ghost btn-sm hover:text-primary"
				>
					<ArrowLeft size={18} />
					Back to App
				</a>
				<div class="h-4 w-px bg-base-content/10"></div>
				<h1 class="text-lg font-bold tracking-tight">Documentation</h1>
			</div>

			<div class="hidden gap-6 text-sm font-medium md:flex">
				{#each sections as section}
					<a href="#{section.id}" class="text-base-content/60 transition hover:text-primary"
						>{section.title}</a
					>
				{/each}
			</div>
		</div>
	</nav>

	<main class="container mx-auto max-w-4xl px-6 py-12">
		<!-- Hero Section -->
		<div class="mb-20 text-center">
			<div
				class="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary"
			>
				Simple. Fast. Beautiful.
			</div>
			<h1 class="mb-6 text-4xl font-black tracking-tight sm:text-6xl">
				Write Code.<br />
				<span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
					>See Magic.</span
				>
			</h1>
			<p class="mx-auto max-w-xl text-lg text-base-content/70">
				Fast Animation Maker lets you create stunning presentations using simple, natural language.
				No complex tools, just you and your ideas.
			</p>
		</div>

		<!-- Basics -->
		<section id="basics" class="mb-24 scroll-mt-24">
			<div class="mb-8 flex items-center gap-3">
				<div
					class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500"
				>
					<Tv size={20} />
				</div>
				<h2 class="text-2xl font-bold">The Basics</h2>
			</div>

			<div class="card border border-base-300 bg-base-100 shadow-sm">
				<div class="card-body">
					<p class="text-base-content/80">
						Every animation starts with a <strong>Presentation title</strong> and one or more
						<strong>Slides</strong>.
					</p>

					<div class="mt-6 rounded-xl bg-base-200 p-4">
						<div class="flex items-center justify-between pb-2">
							<span class="text-xs font-bold tracking-wider text-base-content/40 uppercase"
								>Script</span
							>
							<button
								class="btn btn-square btn-ghost btn-xs"
								onclick={() =>
									copyToClipboard(
										`Presentation: My Awesome Deck\n\nSlide: Introduction\nBackground: #111`
									)}
							>
								{#if copied.includes('Presentation')}
									<Check size={14} class="text-success" />
								{:else}
									<Copy size={14} />
								{/if}
							</button>
						</div>
						<pre class="overflow-x-auto font-mono text-sm leading-relaxed">
<span class="font-bold text-purple-500">Presentation:</span> My Awesome Deck

<span class="font-bold text-blue-500">Slide:</span> Introduction
<span class="text-base-content/60">Background:</span> #1e1e1e</pre>
					</div>
				</div>
			</div>
		</section>

		<!-- Objects -->
		<section id="objects" class="mb-24 scroll-mt-24">
			<div class="mb-8 flex items-center gap-3">
				<div
					class="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500"
				>
					<Box size={20} />
				</div>
				<h2 class="text-2xl font-bold">Adding Objects</h2>
			</div>

			<div class="prose-lg mb-8 prose text-base-content/80">
				<p>
					You can add <strong>Rectangles</strong>, <strong>Circles</strong>, and
					<strong>Text</strong> to your slides. Attributes are defined on the lines following the object
					type.
				</p>
			</div>

			<div class="grid gap-6 md:grid-cols-2">
				<!-- Shape Example -->
				<div class="card border border-base-300 bg-base-100 shadow-sm transition hover:shadow-md">
					<div class="card-body">
						<h3 class="card-title text-base">Shapes</h3>
						<div class="my-4 rounded-lg bg-base-200 p-4">
							<pre class="font-mono text-sm leading-relaxed"><span class="font-bold text-orange-500"
									>Rectangle</span
								>
Width: 30
Height: 20
Color: blue
Align: center center
Radius: 4</pre>
						</div>
						<p class="text-sm text-base-content/60">
							Supports <code class="code text-xs">Width</code>,
							<code class="code text-xs">Height</code>, <code class="code text-xs">Color</code>,
							<code class="code text-xs">Radius</code>
							(for rects), and <code class="code text-xs">Size</code> (for circles).
						</p>
					</div>
				</div>

				<!-- Text Example -->
				<div class="card border border-base-300 bg-base-100 shadow-sm transition hover:shadow-md">
					<div class="card-body">
						<h3 class="card-title text-base">Text</h3>
						<div class="my-4 rounded-lg bg-base-200 p-4">
							<pre class="font-mono text-sm leading-relaxed"><span class="font-bold text-green-500"
									>Text</span
								>
Content: Hello World
Size: 5
Color: white
Weight: 700</pre>
						</div>
						<p class="text-sm text-base-content/60">
							Use <code class="code text-xs">Content</code> to set the text. Position with
							<code class="code text-xs">Align</code>
							or <code class="code text-xs">X/Y</code>.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Animation -->
		<section id="animation" class="mb-24 scroll-mt-24">
			<div class="mb-8 flex items-center gap-3">
				<div
					class="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10 text-pink-500"
				>
					<Play size={20} />
				</div>
				<h2 class="text-2xl font-bold">Animation Magic</h2>
			</div>

			<div
				class="card overflow-hidden border border-primary/20 bg-gradient-to-br from-base-100 to-primary/5 shadow-lg"
			>
				<div class="card-body">
					<h3 class="mb-4 text-lg font-bold">How to animate objects?</h3>
					<p class="mb-6 text-base-content/80">
						The secret ingredient is the <code class="kbd kbd-sm font-bold text-primary">Id</code> property.
						If two objects on different slides have the same Id, the app will automatically morph one
						into the other!
					</p>

					<div class="grid gap-4 md:grid-cols-2">
						<div class="relative rounded-xl border border-base-300 bg-base-100 p-4">
							<div class="absolute top-2 right-2 badge text-xs badge-neutral">Slide 1</div>
							<pre class="font-mono text-xs leading-relaxed opacity-70">
Slide: Start

Circle
<span class="rounded bg-pink-500/10 px-1 font-bold text-pink-500">Id: my-circle</span>
Size: 10
X: 10
Color: red</pre>
						</div>
						<div class="relative rounded-xl border border-base-300 bg-base-100 p-4">
							<div class="absolute top-2 right-2 badge text-xs badge-neutral">Slide 2</div>
							<pre class="font-mono text-xs leading-relaxed opacity-70">
Slide: End

Circle
<span class="rounded bg-pink-500/10 px-1 font-bold text-pink-500">Id: my-circle</span>
Size: 30       <span class="text-[10px] text-success">// Grows!</span>
X: 90          <span class="text-[10px] text-success">// Moves!</span>
Color: blue    <span class="text-[10px] text-success">// Changes color!</span></pre>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Reference -->
		<section id="cheatsheet" class="mb-24 scroll-mt-24">
			<h2 class="mb-8 text-2xl font-bold">Cheat Sheet</h2>
			<div class="overflow-x-auto rounded-xl border border-base-300">
				<table class="table table-zebra bg-base-100">
					<thead>
						<tr class="bg-base-200 text-xs tracking-wider text-base-content/60 uppercase">
							<th class="w-1/4 py-4 pl-6">Keyword</th>
							<th class="py-4">Description</th>
							<th class="w-1/3 py-4 pr-6">Example</th>
						</tr>
					</thead>
					<tbody class="text-sm">
						<tr>
							<td class="pl-6 font-mono font-bold text-primary">Slide: [Name]</td>
							<td>Starts a new slide.</td>
							<td class="pr-6 font-mono opacity-70">Slide: Intro</td>
						</tr>
						<tr>
							<td class="pl-6 font-mono font-bold text-primary">Background: [Value]</td>
							<td>Sets slide or object background color.</td>
							<td class="pr-6 font-mono opacity-70">Background: #000</td>
						</tr>
						<tr>
							<td class="pl-6 font-mono font-bold text-secondary">Rectangle / Circle / Text</td>
							<td>Creates a new object.</td>
							<td class="pr-6 font-mono opacity-70">Rectangle</td>
						</tr>
						<tr>
							<td class="pl-6 font-mono font-bold">Id: [Name]</td>
							<td>Unique identifier for animation matching.</td>
							<td class="pr-6 font-mono opacity-70">Id: hero-box</td>
						</tr>
						<tr>
							<td class="pl-6 font-mono font-bold">X / Y: [Number]</td>
							<td>Position in percentage (0-100).</td>
							<td class="pr-6 font-mono opacity-70">X: 50</td>
						</tr>
						<tr>
							<td class="pl-6 font-mono font-bold">Width / Height: [Number]</td>
							<td>Size in percentage.</td>
							<td class="pr-6 font-mono opacity-70">Width: 25</td>
						</tr>
						<tr>
							<td class="pl-6 font-mono font-bold">Align: [H] [V]</td>
							<td>Alignment relative to X/Y.</td>
							<td class="pr-6 font-mono opacity-70">Align: center center</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<footer class="border-t border-base-300 py-12 text-center text-sm text-base-content/50">
			<p>Built with Fast Animation Maker.</p>
		</footer>
	</main>
</div>
