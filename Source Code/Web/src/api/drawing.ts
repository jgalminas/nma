import { Count } from '../types/admin.types';
import { BASE_URL } from './api.config';

export async function fetchDrawingCount(): Promise<Count> {
	const res = await fetch(`${BASE_URL}/drawing/count`);
	return res.json();
}