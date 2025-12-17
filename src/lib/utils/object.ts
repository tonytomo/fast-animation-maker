import type { AlignHorizontal, AlignVertical } from '$lib/types/slideshow.type';

export function getPosition({ x, y }: { x: number; y: number }) {
	return `${y}% auto auto ${x}%`;
}

export function getWidth({ width }: { width: number }) {
	return `${width}%`;
}

export function getHeight({ height }: { height: number }) {
	return height ? `${height}%` : 'auto';
}

export function getFont({ fontSize, fontWeight }: { fontSize: number; fontWeight: number }) {
	return `${(fontSize / 10) * 40}% ${fontWeight * 100}`;
}

export function getRounded({ rounded }: { rounded: number }) {
	return `${rounded * 5}px`;
}

export function getAlign({ alignX, alignY }: { alignX: AlignHorizontal; alignY: AlignVertical }) {
	const horizontal = {
		l: 'translateX(0%)',
		c: 'translateX(-50%)',
		r: 'translateX(-100%)'
	}[alignX];

	const vertical = {
		t: 'translateY(0%)',
		c: 'translateY(-50%)',
		b: 'translateY(-100%)'
	}[alignY];

	return `${horizontal} ${vertical}`;
}
