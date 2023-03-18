import { Count, Event } from '../types/admin.types';
import { BASE_URL } from './api.config';

export async function fetchEventById(id: number): Promise<Event> {
	const res = await fetch(`${BASE_URL}/event/${id}`);
	return res.json();
}

export async function fetchEventCount(): Promise<Count> {
	const res = await fetch(`${BASE_URL}/event/count`);
	return res.json();
}