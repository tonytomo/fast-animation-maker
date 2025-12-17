import type { SlideShape } from '$lib/types/slideshow.type';

export const defaultShape: Omit<SlideShape, 'type'> = {
	id: '',
	x: 50,
	y: 50,
	width: 20,
	height: 0,
	background: 'black',
	alignX: 'c',
	alignY: 'c'
};
