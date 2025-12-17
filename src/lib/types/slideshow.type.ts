export interface SlideShow {
	title: string;
	slides: Slide[];
}

export interface Slide {
	title: string;
	color: string;
	objects: SlideObject[];
}

export type SlideObject = SlideShape | SlideText;

export interface Object {
	id: string;
	x: number;
	y: number;
	alignX: AlignHorizontal;
	alignY: AlignVertical;
}

export type AlignHorizontal = 'l' | 'c' | 'r';
export type AlignVertical = 't' | 'c' | 'b';

export interface SlideShapeBase extends Object {
	width: number;
	height: number;
	background: string;
}

export interface SlideRect extends SlideShapeBase {
	type: 'rect';
	rounded: number;
}

export interface SlideCircle extends SlideShapeBase {
	type: 'circle';
}

export type SlideShape = SlideRect | SlideCircle;

export interface SlideText extends Object {
	text: string;
	size: number;
	weight: number;
	level: TextLevel;
	color: string;
	type: 'text';
}

export type TextLevel = 'h' | 'p';
