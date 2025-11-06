import type { Slide, SlideObject } from '$lib/types/slideshow.type';
import { writable } from 'svelte/store';
import { slideshow } from './slides.store';

export const codeEditor = writable<HTMLTextAreaElement | null>(null);

export const code = writable('');

code.subscribe((value) => {
	const lines = value.split('\n');

	let slideShowTitle = '';
	const slides: Slide[] = [];
	for (const line of lines) {
		// Ex: # Slideshow Title
		if (line.startsWith('# ')) {
			slideShowTitle = line.slice(1);
		}

		// Ex: ## Slide Title
		if (line.startsWith('## ')) {
			const slide: Slide = {
				title: line.slice(2),
				objects: []
			};
			slides.push(slide);
		}

		// Ex: circle: objectName #ff0000 x y w h
		if (line.startsWith('circle:')) {
			const parts = line.split(' ');
			const object: SlideObject = {
				name: parts[1],
				posX: parseInt(parts[3]),
				posY: parseInt(parts[4]),
				w: parseInt(parts[5]),
				h: parseInt(parts[6]),
				type: 'circle',
				color: parts[2]
			};
			slides[slides.length - 1].objects.push(object);
		}

		// Ex: rect: objectName #ff0000 x y w h
		if (line.startsWith('rect:')) {
			const parts = line.split(' ');
			const object: SlideObject = {
				name: parts[1],
				posX: parseInt(parts[3]),
				posY: parseInt(parts[4]),
				w: parseInt(parts[5]),
				h: parseInt(parts[6]),
				type: 'rect',
				color: parts[2]
			};
			slides[slides.length - 1].objects.push(object);
		}

		// Ex: text: objectName #ff0000 x y w h
		if (line.startsWith('text:')) {
			const parts = line.split(' ');
			const object: SlideObject = {
				name: parts[1],
				posX: parseInt(parts[3]),
				posY: parseInt(parts[4]),
				w: parseInt(parts[5]),
				h: parseInt(parts[6]),
				type: 'text',
				color: parts[2]
			};
			slides[slides.length - 1].objects.push(object);
		}
	}

	slideshow.set({ title: slideShowTitle, slides });
});
