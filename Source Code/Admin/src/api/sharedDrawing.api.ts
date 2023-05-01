import { Drawing } from '../admin.types';
import { BASE_URL } from './api.config';

export async function fetchDrawingById(id: number): Promise<Drawing> {
	const res = await fetch(`${BASE_URL}/drawing/${id}`);
	return res.json();
}

export async function fetchImage(imageUrl: string): Promise<Blob> {
	const res = await fetch(BASE_URL + imageUrl);	
	return res.blob();
}

export async function fetchFirstUnscoredDrawing(): Promise<Drawing> {
	const res = await fetch(`${BASE_URL}/drawing/first-unscored`);	
	return res.json();
}