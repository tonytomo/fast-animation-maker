import type { SlideShow } from '$lib/types/slideshow.type';
import { writable } from 'svelte/store';

export const slideshow = writable<SlideShow>({
	title: '',
	slides: []
});
