import { Count, Drawing } from '../types/admin.types';
import { BASE_URL } from './api.config';

export async function fetchDrawingCount(): Promise<Count> {
	const res = await fetch(`${BASE_URL}/drawing/count`);
	return res.json();
}

export async function fetchRecentDrawings(count: number): Promise<Drawing[]> {
	const res = await fetch(`${BASE_URL}/drawings?unscoredOnly=True&count=${count}`);
	return res.json();
}