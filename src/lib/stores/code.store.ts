import type { AlignHorizontal, AlignVertical, Slide } from '$lib/types/slideshow.type';
import { writable } from 'svelte/store';
import { slideshow } from './slides.store';
import { defaultShape } from '$lib/config/shape.default';

export const codeEditor = writable<HTMLTextAreaElement | null>(null);
export const code = writable('');

export function saveToLocalStorage(code: string) {
	localStorage.setItem('code', code);
}

export function loadFromLocalStorage() {
	const code = localStorage.getItem('code');
	if (code) {
		return code;
	}
	return `Presentation: My Animation

Slide: Welcome
Background: #1e1e1e

Text
Id: title
Content: Make Animation Simple
Size: 5
Color: white
Align: center center

Slide: Shapes
Background: #2d2d2d

Rectangle
Id: box
Width: 30
Height: 20
Color: #3b82f6
Align: center center
Radius: 4

Circle
Id: circle
Size: 15
Color: #ef4444
X: 80
Y: 20
`;
}

code.subscribe((value) => {
	const lines = value.split('\n');

	let slideShowTitle = 'Untitled Presentation';
	let slides: Slide[] = [];
	let currentSlide: Slide | null = null;
	let currentObject: any = null;

	const flushObject = () => {
		if (currentSlide && currentObject) {
			currentSlide.objects.push(currentObject);
			currentObject = null;
		}
	};

	for (let line of lines) {
		line = line.trim();
		if (!line) continue;

		if (line.toLowerCase().startsWith('presentation:')) {
			slideShowTitle = line.split(':')[1].trim();
			continue;
		}

		if (line.toLowerCase().startsWith('slide:')) {
			flushObject();
			const parts = line.split(':');
			const title = parts[1].trim();
			const newSlide: Slide = {
				title,
				color: 'white',
				objects: []
			};
			slides.push(newSlide);
			currentSlide = newSlide;
			continue;
		}

		if (currentSlide) {
			const lowerLine = line.toLowerCase();

			// Slide Properties
			if (lowerLine.startsWith('background:')) {
				currentSlide.color = line.split(':')[1].trim();
				continue;
			}

			// Objects Start
			if (lowerLine === 'rectangle') {
				flushObject();
				currentObject = { ...defaultShape, type: 'rect', rounded: 0 };
				continue;
			}
			if (lowerLine === 'circle') {
				flushObject();
				currentObject = { ...defaultShape, type: 'circle' };
				continue;
			}
			if (lowerLine === 'text') {
				flushObject();
				currentObject = {
					id: '', x: 50, y: 50, alignX: 'c', alignY: 'c', // Base Object defaults
					type: 'text', text: 'New Text', size: 16, weight: 400, level: 'p', color: 'black'
				};
				continue;
			}

			// Object Properties
			if (currentObject) {
				const [key, ...valueParts] = line.split(':');
				const val = valueParts.join(':').trim();
				const lowerKey = key.toLowerCase().trim();

				if (lowerKey === 'id') currentObject.id = val;
				else if (lowerKey === 'x') currentObject.x = parseInt(val);
				else if (lowerKey === 'y') currentObject.y = parseInt(val);
				else if (lowerKey === 'width' || lowerKey === 'w') currentObject.width = parseInt(val);
				else if (lowerKey === 'height' || lowerKey === 'h') currentObject.height = parseInt(val);
				else if (lowerKey === 'size') {
					const size = parseInt(val);
					if (currentObject.type === 'text') currentObject.size = size;
					else { currentObject.width = size; currentObject.height = size; }
				}
				else if (lowerKey === 'color' || lowerKey === 'background') {
					if (currentObject.type === 'text') currentObject.color = val;
					else currentObject.background = val;
				}
				else if (lowerKey === 'radius' || lowerKey === 'rounded') {
					if (currentObject.type === 'rect') currentObject.rounded = parseInt(val);
				}
				else if (lowerKey === 'content' || lowerKey === 'text') {
					if (currentObject.type === 'text') currentObject.text = val;
				}
				else if (lowerKey === 'weight') {
					if (currentObject.type === 'text') currentObject.weight = parseInt(val);
				}
				else if (lowerKey === 'align') {
					const parts = val.toLowerCase().split(' ');
					const vMap: Record<string, string> = { top: 't', center: 'c', bottom: 'b' };
					const hMap: Record<string, string> = { left: 'l', center: 'c', right: 'r' };

					// try to detect map based on keywords e.g. "top left"
					let vFound = 'c';
					let hFound = 'c';

					// If only one value provided (e.g. "center"), apply to both if valid, or just one
					parts.forEach(p => {
						if (vMap[p]) vFound = vMap[p];
						if (hMap[p]) hFound = hMap[p];
					});

					currentObject.alignY = vFound as AlignVertical;
					currentObject.alignX = hFound as AlignHorizontal;
				}
			}
		}
	}
	flushObject();

	slideshow.set({ title: slideShowTitle, slides });
});
