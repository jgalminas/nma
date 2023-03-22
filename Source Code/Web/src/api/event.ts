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

export async function fetchEvents(page: number, count?: number): Promise<Event[]> {
	const res = await fetch(`${BASE_URL}/event?page=${page}&count=${count ?? 10}`);
	return res.json();
}

export async function createEvent(event: Event): Promise<Response> {

	const res = await fetch(`${BASE_URL}/event`, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(event)
	});

	return res.json();
}