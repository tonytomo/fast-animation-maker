import type { AlignHorizontal, AlignVertical, Slide, SlideShape } from '$lib/types/slideshow.type';
import { writable } from 'svelte/store';
import { slideshow } from './slides.store';
import { defaultShape } from '$lib/config/shape.default';

export const codeEditor = writable<HTMLTextAreaElement | null>(null);
export const code = writable('');

function getShape(parts: string[], shape: SlideShape): SlideShape {
	const object: SlideShape = shape;

	for (const part of parts) {
		if (part.startsWith('id:')) object.id = part.split(':')[1].trim();
		if (part.startsWith('x:')) object.x = parseInt(part.split(':')[1].trim());
		if (part.startsWith('y:')) object.y = parseInt(part.split(':')[1].trim());
		if (part.startsWith('w:')) object.width = parseInt(part.split(':')[1].trim());
		if (part.startsWith('h:')) object.height = parseInt(part.split(':')[1].trim());
		if (part.startsWith('a:')) {
			const align = part.split(':')[1].trim();
			object.alignY = align.charAt(0) as AlignVertical;
			object.alignX = align.charAt(1) as AlignHorizontal;
		}
		if (object.type === 'rect')
			if (part.startsWith('r:')) object.rounded = parseInt(part.split(':')[1].trim());
	}

	return object;
}

export function saveToLocalStorage(code: string) {
	localStorage.setItem('code', code);
}

export function loadFromLocalStorage() {
	const code = localStorage.getItem('code');
	if (code) {
		return code;
	}
	return '';
}

code.subscribe((value) => {
	const lines = value.split('\n');

	let slideShowTitle = '';
	let slides: Slide[] = [];
	for (const line of lines) {
		if (line.startsWith('# ')) {
			slideShowTitle = line.slice(1);
		}

		if (line.startsWith('## ')) {
			const parts = line.split(':');
			const slide: Slide = {
				title: parts[0].slice(2),
				color: parts[1] || 'white',
				objects: []
			};
			slides.push(slide);
		}

		if (line.startsWith('r>')) {
			const type = 'rect';
			const parts = line.split(';').map((part) => part.trim());
			const background = parts[0].split('>')[1].trim();
			const object = getShape(parts, { ...defaultShape, background, type, rounded: 0 });

			slides[slides.length - 1].objects.push(object);
		}

		// if (line.startsWith('circle:') || line.startsWith('c:')) {
		// 	const parts = splitParts(line);
		// 	const object = getShape(parts, 'circle');
		// 	slides[slides.length - 1].objects.push(object);
		// }

		// if (line.startsWith('rect:') || line.startsWith('r:')) {
		// 	const parts = splitParts(line);
		// 	const object = getShape(parts, 'rect');
		// 	slides[slides.length - 1].objects.push(object);
		// }

		// if (line.startsWith('text:') || line.startsWith('t:')) {
		// 	const parts = splitParts(line);
		// 	const object = getText(parts);
		// 	slides[slides.length - 1].objects.push(object);
		// }

		// TODO: Create more shapes
	}

	slides = slides;
	slideshow.set({ title: slideShowTitle, slides });
});
