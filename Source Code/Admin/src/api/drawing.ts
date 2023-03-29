import { Count, Drawing } from '../admin.types';
import { BASE_URL } from './api.config';

export async function fetchDrawingCount(): Promise<Count> {
	const res = await fetch(`${BASE_URL}/drawing/count`);
	return res.json();
}

export async function fetchDrawings(page: number, count: number, unscoredOnly: boolean): Promise<Drawing[]> {
	const res = await fetch(`${BASE_URL}/drawings?unscoredOnly=${unscoredOnly}&count=${count}&page=${page}`);
	return res.json();
}