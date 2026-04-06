<script lang="ts">
	import { resolve } from '$app/paths';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import Copy from '@lucide/svelte/icons/copy';
	import Check from '@lucide/svelte/icons/check';
	import Tv from '@lucide/svelte/icons/tv';
	import Play from '@lucide/svelte/icons/play';
	import Box from '@lucide/svelte/icons/box';
	import Type from '@lucide/svelte/icons/type';
	import Move from '@lucide/svelte/icons/move';
	import Layers from '@lucide/svelte/icons/layers';
	import Sparkles from '@lucide/svelte/icons/sparkles';

	let copied = $state('');

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
		copied = text;
		setTimeout(() => (copied = ''), 2000);
	}

	const sections = [
		{ id: 'basics', title: 'The Basics' },
		{ id: 'objects', title: 'Objects & Properties' },
		{ id: 'positioning', title: 'Positioning' },
		{ id: 'animation', title: 'Animation' },
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
					class="btn btn-ghost btn-sm gap-2 text-base-content/70 hover:text-primary"
				>
					<ArrowLeft size={18} />
					Back to App
				</a>
				<div class="h-4 w-px bg-base-content/10"></div>
				<h1 class="text-lg font-bold tracking-tight">Documentation</h1>
			</div>

			<div class="hidden gap-6 text-sm font-medium md:flex">
				{#each sections as section}
					<a
						href="#{section.id}"
						class="text-base-content/60 transition hover:scale-105 hover:text-primary"
						>{section.title}</a
					>
				{/each}
			</div>
		</div>
	</nav>

	<main class="container mx-auto max-w-5xl px-6 py-16">
		<!-- Hero Section -->
		<div class="mb-24 text-center">
			<div
				class="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-bold shadow-[0_0_15px_rgba(var(--p),0.2)] text-primary"
			>
				<Sparkles size={16} /> Fast Animation Maker Guide
			</div>
			<h1 class="mb-6 text-5xl font-black tracking-tight sm:text-7xl shadow-sm">
				Write simple text.<br />
				<span class="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent"
					>Create stunning slides.</span
				>
			</h1>
			<p class="mx-auto max-w-2xl text-xl leading-relaxed text-base-content/70">
				Welcome to the official guide. Learn the simple syntax to generate beautiful, animated
				presentations in seconds. No complex tools, just you and your ideas.
			</p>
		</div>

		<!-- Basics -->
		<section id="basics" class="mb-24 scroll-mt-24">
			<div class="mb-8 flex items-center gap-4">
				<div
					class="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 shadow-inner"
				>
					<Tv size={28} />
				</div>
				<div>
					<h2 class="text-3xl font-bold tracking-tight">The Basics</h2>
					<p class="text-base-content/60">The structure of every presentation.</p>
				</div>
			</div>

			<div class="grid gap-6 md:grid-cols-2">
				<div class="card border border-base-300 bg-base-100 shadow-md">
					<div class="card-body prose">
						<p class="text-lg text-base-content/80">
							Every animation begins with a <strong>Presentation</strong> title, followed by one or
							more <strong>Slides</strong>.
						</p>
						<ul class="mt-4 space-y-3 text-base-content/70">
							<li>
								<code class="font-bold text-primary">Presentation: [Title]</code> - Starts the deck.
							</li>
							<li>
								<code class="font-bold text-primary">Slide: [Name]</code> - Creates a new slide.
							</li>
							<li>
								<code class="font-bold text-primary">Background: [Color]</code> - Sets the slide's
								background color (e.g. #1e1e1e or white).
							</li>
						</ul>
					</div>
				</div>

				<div class="card overflow-hidden border border-gray-800 bg-gray-900 text-gray-300 shadow-xl">
					<div
						class="flex items-center justify-between border-b border-gray-800 bg-gray-950 px-4 py-2"
					>
						<span
							class="flex items-center gap-2 text-xs font-bold tracking-wider text-gray-500 uppercase"
							><Layers size={14} /> Example Structure</span
						>
						<button
							class="btn btn-square btn-ghost btn-xs text-gray-400 hover:text-white"
							onclick={() =>
								copyToClipboard(
									`Presentation: My Awesome Deck\n\nSlide: Introduction\nBackground: #1e1e1e`
								)}
						>
							{#if copied.includes('Presentation')}
								<Check size={14} class="text-success" />
							{:else}
								<Copy size={14} />
							{/if}
						</button>
					</div>
					<div class="p-6">
						<pre class="font-mono text-sm leading-loose">
<span class="font-bold text-purple-400">Presentation:</span> My Awesome Deck

<span class="font-bold text-blue-400">Slide:</span> Introduction
<span class="text-gray-500">Background:</span> #1e1e1e</pre>
					</div>
				</div>
			</div>
		</section>

		<!-- Objects -->
		<section id="objects" class="mb-24 scroll-mt-24">
			<div class="mb-8 flex items-center gap-4">
				<div
					class="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500 shadow-inner"
				>
					<Box size={28} />
				</div>
				<div>
					<h2 class="text-3xl font-bold tracking-tight">Objects & Properties</h2>
					<p class="text-base-content/60">Elements you can actually see on your slides.</p>
				</div>
			</div>

			<p class="mb-10 text-lg leading-relaxed text-base-content/70">
				Add an object by writing its type (<strong class="text-orange-500">Rectangle</strong>,
				<strong class="text-orange-500">Circle</strong>, or
				<strong class="text-green-500">Text</strong>) on a new line, automatically followed by its
				display properties on subsequent lines.
			</p>

			<div class="grid gap-6 md:grid-cols-3">
				<!-- Rectangle -->
				<div
					class="card group border border-base-300 bg-base-100 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
				>
					<div class="card-body">
						<div class="mb-4 flex items-center gap-3">
							<div
								class="h-6 w-8 rounded-sm bg-orange-500 transition-colors group-hover:bg-orange-400"
							></div>
							<h3 class="card-title text-2xl">Rectangle</h3>
						</div>
						<ul class="mb-6 space-y-2 text-sm text-base-content/70">
							<li>
								<code class="font-semibold text-base-content/90">Width: [0-100]</code> (%)
							</li>
							<li>
								<code class="font-semibold text-base-content/90">Height: [0-100]</code> (%)
							</li>
							<li>
								<code class="font-semibold text-base-content/90">Radius: [0-20]</code> (px)
							</li>
							<li><code class="font-semibold text-base-content/90">Color: [Value]</code></li>
							<li>
								<code class="font-semibold text-base-content/90">Background: [Value]</code>
							</li>
						</ul>
						<div
							class="mt-auto rounded-lg border border-gray-800 bg-gray-900 p-3 font-mono text-xs text-gray-300"
						>
							<span class="font-bold text-orange-400">Rectangle</span><br />
							<span class="text-gray-500">Width:</span> 50<br />
							<span class="text-gray-500">Height:</span> 30<br />
							<span class="text-gray-500">Color:</span> blue<br />
							<span class="text-gray-500">Radius:</span> 12
						</div>
					</div>
				</div>

				<!-- Circle -->
				<div
					class="card group border border-base-300 bg-base-100 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
				>
					<div class="card-body">
						<div class="mb-4 flex items-center gap-3">
							<div
								class="h-8 w-8 rounded-full bg-orange-500 transition-colors group-hover:bg-orange-400"
							></div>
							<h3 class="card-title text-2xl">Circle</h3>
						</div>
						<ul class="mb-6 space-y-2 text-sm text-base-content/70">
							<li><code class="font-semibold text-base-content/90">Size: [0-8]</code> (%)</li>
							<li><code class="font-semibold text-base-content/90">Color: [Value]</code></li>
							<li>
								<code class="font-semibold text-base-content/90">Background: [Value]</code>
							</li>
						</ul>
						<div
							class="mt-auto rounded-lg border border-gray-800 bg-gray-900 p-3 font-mono text-xs text-gray-300"
						>
							<span class="font-bold text-orange-400">Circle</span><br />
							<span class="text-gray-500">Size:</span> 5<br />
							<span class="text-gray-500">Color:</span> red<br />
							<span class="text-gray-500">Background:</span> white
						</div>
					</div>
				</div>

				<!-- Text -->
				<div
					class="card group border border-base-300 bg-base-100 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
				>
					<div class="card-body">
						<div
							class="mb-4 flex items-center gap-3 text-green-500 transition-colors group-hover:text-green-400"
						>
							<Type size={32} />
							<h3 class="card-title text-2xl text-base-content">Text</h3>
						</div>
						<ul class="mb-6 space-y-2 text-sm text-base-content/70">
							<li>
								<code class="font-semibold text-base-content/90">Content: [String]</code>
							</li>
							<li><code class="font-semibold text-base-content/90">Size: [0-8]</code></li>
							<li>
								<code class="font-semibold text-base-content/90">Weight: [0-10]</code>
							</li>
							<li><code class="font-semibold text-base-content/90">Color: [Value]</code></li>
							<li>
								<code class="font-semibold text-base-content/90">Background: [Value]</code>
							</li>
						</ul>
						<div
							class="mt-auto rounded-lg border border-gray-800 bg-gray-900 p-3 font-mono text-xs text-gray-300"
						>
							<span class="font-bold text-green-400">Text</span><br />
							<span class="text-gray-500">Content:</span> Hello!<br />
							<span class="text-gray-500">Size:</span> 6<br />
							<span class="text-gray-500">Weight:</span> 7<br />
							<span class="text-gray-500">Color:</span> black
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Positioning -->
		<section id="positioning" class="mb-24 scroll-mt-24">
			<div class="mb-8 flex items-center gap-4">
				<div
					class="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-500 shadow-inner"
				>
					<Move size={28} />
				</div>
				<div>
					<h2 class="text-3xl font-bold tracking-tight">Positioning</h2>
					<p class="text-base-content/60">Place your objects precisely on the canvas.</p>
				</div>
			</div>

			<div class="card border border-base-300 bg-base-100 shadow-md">
				<div class="card-body">
					<p class="mb-8 text-lg text-base-content/80">
						All objects share these global coordinates and properties to determine exactly where they
						exist on your slide.
					</p>
					<div class="grid gap-6 md:grid-cols-3">
						<div class="rounded-xl border border-base-300/50 bg-base-200 p-5">
							<div class="mb-3 text-xl font-bold">X & Y Coordinates</div>
							<p class="text-sm leading-relaxed text-base-content/70">
								<code class="font-bold text-primary">X: [0-100]</code> percentage horizontal.<br />
								<code class="font-bold text-primary">Y: [0-100]</code> percentage vertical.<br />
								(0 is top/left, 100 is bottom/right).
							</p>
						</div>
						<div class="rounded-xl border border-base-300/50 bg-base-200 p-5">
							<div class="mb-3 text-xl font-bold">Alignment</div>
							<p class="text-sm leading-relaxed text-base-content/70">
								<code class="font-bold text-primary">Align: [H] [V]</code> anchors the object relative
								to X/Y. Example: <code class="opacity-80">Align: center center</code> or
								<code class="opacity-80">Align: right bottom</code>.
							</p>
						</div>
						<div class="rounded-xl border border-base-300/50 bg-base-200 p-5">
							<div class="mb-3 text-xl font-bold">Layering</div>
							<p class="text-sm leading-relaxed text-base-content/70">
								Objects are visually layered in the order they are defined. Lower in the script =
								Higher layer (appears on top).
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Animation -->
		<section id="animation" class="mb-24 scroll-mt-24">
			<div class="mb-8 flex items-center gap-4">
				<div
					class="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-500 shadow-inner"
				>
					<Play size={28} />
				</div>
				<div>
					<h2 class="text-3xl font-bold tracking-tight">Animation Magic</h2>
					<p class="text-base-content/60">Breathe life into your shapes and text.</p>
				</div>
			</div>

			<div
				class="card overflow-hidden border border-pink-500/20 bg-linear-to-br from-pink-500/5 to-purple-500/10 shadow-xl"
			>
				<div class="card-body">
					<h3 class="mb-3 flex items-center gap-2 text-2xl font-bold">
						<Sparkles class="text-pink-500" /> Connect with Ids
					</h3>
					<p class="mb-8 text-lg leading-relaxed text-base-content/80">
						The secret to smooth animation is the <code
							class="kbd kbd-sm rounded-md border-pink-200 bg-pink-100 font-bold text-pink-600 dark:border-pink-800 dark:bg-pink-900 dark:text-pink-300"
							>Id: [Name]</code
						>
						property. When you give an object an `Id`, and use that exact same `Id` on the next slide,
						the engine automatically <strong>morphs</strong> the object between its two states—animating
						position, color, scale, and more!
					</p>

					<div class="grid gap-6 md:grid-cols-2">
						<div
							class="relative rounded-2xl border border-gray-700 bg-gray-900 p-6 text-gray-300 shadow-2xl"
						>
							<div class="badge badge-primary absolute -top-3 right-4 font-bold shadow-sm">
								Slide 1
							</div>
							<pre class="font-mono text-sm leading-relaxed">
<span class="font-bold text-blue-400">Slide:</span> Start Move

<span class="font-bold text-orange-400">Circle</span>
<span class="rounded bg-pink-500/20 px-1.5 py-0.5 font-bold text-pink-400">Id: hero-circle</span>
<span class="text-gray-500">Size:</span> 10
<span class="text-gray-500">X:</span> 10
<span class="text-gray-500">Y:</span> 50
<span class="text-gray-500">Color:</span> red</pre>
						</div>
						<div
							class="relative rounded-2xl border border-gray-700 bg-gray-900 p-6 text-gray-300 shadow-2xl"
						>
							<div class="badge badge-secondary absolute -top-3 right-4 font-bold shadow-sm">
								Slide 2
							</div>
							<pre class="font-mono text-sm leading-relaxed">
<span class="font-bold text-blue-400">Slide:</span> End Move

<span class="font-bold text-orange-400">Circle</span>
<span class="rounded bg-pink-500/20 px-1.5 py-0.5 font-bold text-pink-400">Id: hero-circle</span>
<span class="text-gray-500">Size:</span> 30       <span class="italic text-green-400/80">// Morphs Size!</span>
<span class="text-gray-500">X:</span> 90          <span class="italic text-green-400/80">// Animates X Pos!</span>
<span class="text-gray-500">Y:</span> 50
<span class="text-gray-500">Color:</span> blue    <span class="italic text-green-400/80">// Blends Color!</span></pre>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Reference -->
		<section id="cheatsheet" class="mb-12 scroll-mt-24">
			<div class="mb-8">
				<h2 class="text-3xl font-bold tracking-tight">Cheat Sheet</h2>
				<p class="text-base-content/60">A quick reference to all properties and values.</p>
			</div>
			<div class="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-md">
				<table class="table w-full text-left">
					<thead class="bg-base-200/50">
						<tr
							class="border-b border-base-300 text-sm tracking-wider text-base-content/60 uppercase"
						>
							<th class="w-1/4 py-5 font-semibold pl-6">Keyword</th>
							<th class="py-5 font-semibold">Description</th>
							<th class="w-1/3 py-5 font-semibold pr-6">Accepts</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-base-200 text-base">
						<tr class="transition-colors hover:bg-base-200/30">
							<td class="pl-6 font-mono font-bold text-purple-600 dark:text-purple-400"
								>Presentation: [Title]</td
							>
							<td class="text-base-content/80">Starts the deck. Must be at the very top.</td>
							<td class="pr-6 text-base-content/60">String</td>
						</tr>
						<tr class="transition-colors hover:bg-base-200/30">
							<td class="pl-6 font-mono font-bold text-blue-600 dark:text-blue-400"
								>Slide: [Name]</td
							>
							<td class="text-base-content/80">Declares a new slide.</td>
							<td class="pr-6 text-base-content/60">String</td>
						</tr>
						<tr class="transition-colors hover:bg-base-200/30">
							<td class="pl-6 font-mono font-bold text-pink-600 dark:text-pink-400"
								>Id: [Name]</td
							>
							<td class="text-base-content/80">Unique identifier for animation binding.</td>
							<td class="pr-6 text-base-content/60">String (no spaces)</td>
						</tr>
						<tr class="transition-colors hover:bg-base-200/30">
							<td class="pl-6 font-mono font-bold">X: / Y: [Number]</td>
							<td class="text-base-content/80">Horizontal / Vertical position.</td>
							<td class="pr-6 text-base-content/60">Number (0 to 100)</td>
						</tr>
						<tr class="transition-colors hover:bg-base-200/30">
							<td class="pl-6 font-mono font-bold">Align: [H] [V]</td>
							<td class="text-base-content/80">Alignment axis.</td>
							<td class="pr-6 text-base-content/60"
								>left/center/right top/center/bottom</td
							>
						</tr>
						<tr class="transition-colors hover:bg-base-200/30">
							<td class="pl-6 font-mono font-bold">Width: / Height:</td>
							<td class="text-base-content/80">Size limits for Rectangles.</td>
							<td class="pr-6 text-base-content/60">Number (0 to 100)</td>
						</tr>
						<tr class="transition-colors hover:bg-base-200/30">
							<td class="pl-6 font-mono font-bold">Size: [Number]</td>
							<td class="text-base-content/80">Scale for Text or Circles.</td>
							<td class="pr-6 text-base-content/60">Number (0 to 8)</td>
						</tr>
						<tr class="transition-colors hover:bg-base-200/30">
							<td class="pl-6 font-mono font-bold">Radius: [Number]</td>
							<td class="text-base-content/80">Border roundness for Rectangles.</td>
							<td class="pr-6 text-base-content/60">Number (0 to 20)</td>
						</tr>
						<tr class="transition-colors hover:bg-base-200/30">
							<td class="pl-6 font-mono font-bold">Weight: [Number]</td>
							<td class="text-base-content/80">Font weight thickness for Text.</td>
							<td class="pr-6 text-base-content/60">Number (0 to 10)</td>
						</tr>
						<tr class="transition-colors hover:bg-base-200/30">
							<td class="pl-6 font-mono font-bold">Color: / Background:</td>
							<td class="text-base-content/80">Shape colors, text colors, slide bg.</td>
							<td class="pr-6 text-base-content/60">Hex (e.g. #fff), color name</td>
						</tr>
						<tr class="transition-colors hover:bg-base-200/30">
							<td class="pl-6 font-mono font-bold text-green-600 dark:text-green-400"
								>Content: [Text]</td
							>
							<td class="text-base-content/80">The string to display in a Text object.</td>
							<td class="pr-6 text-base-content/60">String</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<footer class="mt-20 border-t border-base-300 pt-12 pb-24 text-center">
			<div
				class="inline-flex items-center gap-2 rounded-full bg-base-200 px-6 py-3 text-sm font-medium text-base-content/70 shadow-inner"
			>
				<Sparkles size={16} class="text-primary" /> Created with Fast Animation Maker
			</div>
		</footer>
	</main>
</div>
