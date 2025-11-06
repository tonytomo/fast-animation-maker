export interface SlideShow {
	title: string;
	slides: Slide[];
}

export interface Slide {
	title: string;
	objects: SlideObject[];
}

export interface SlideObject {
	name: string;
	posX: number;
	posY: number;
	w: number;
	h: number;
	type: SlideObjectType;
	color: string;
}

export type SlideObjectType = 'circle' | 'rect' | 'text';
