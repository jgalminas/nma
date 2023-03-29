import { Count, Drawing, DrawingWithScores } from '../admin.types';
import { BASE_URL } from './api.config';

export async function fetchDrawingById(id: number): Promise<Drawing> {
	const res = await fetch(`${BASE_URL}/drawing/${id}`);
	return res.json();
}

export async function fetchDrawingByIdWithScores(id: number, withScores: boolean): Promise<DrawingWithScores> {
	const res = await fetch(`${BASE_URL}/drawing/${id}?withScores=${withScores}`);
	return res.json();
}

export async function fetchDrawingCount(): Promise<Count> {
	const res = await fetch(`${BASE_URL}/drawing/count`);
	return res.json();
}

export async function fetchDrawings(page: number, count: number, unscoredOnly: boolean): Promise<Drawing[]> {
	const res = await fetch(`${BASE_URL}/drawings?unscoredOnly=${unscoredOnly}&count=${count}&page=${page}`);
	return res.json();
}

export async function deleteDrawingById(id: number): Promise<Response> {
	const res = await fetch(`${BASE_URL}/drawing/${id}`, {
		method: 'DELETE',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
	});

	return res;
}