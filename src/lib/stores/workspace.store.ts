import { writable } from 'svelte/store';

interface Workspace {
	fullscreen: boolean;
	page: number;
	height: number;
}

export const workspace = writable<Workspace>({
	fullscreen: false,
	page: 1,
	height: 0
});

export function toggleFullscreen() {
	workspace.update((state) => {
		return {
			...state,
			fullscreen: !state.fullscreen
		};
	});
}

export function nextPage(length: number) {
	workspace.update((state) => {
		return {
			...state,
			page: state.page === length ? state.page : state.page + 1
		};
	});
}

export function prevPage() {
	workspace.update((state) => {
		return {
			...state,
			page: state.page === 1 ? state.page : state.page - 1
		};
	});
}
