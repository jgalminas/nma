import { Count, EventState, Location, LocationIdName, LocationState } from '../admin.types';
import { BASE_URL } from './api.config';

export async function fetchLocationCount(): Promise<Count> {
	const res = await fetch(`${BASE_URL}/location/count`);
	return res.json();
}

export async function fetchLocationList(): Promise<LocationIdName[]> {
	const res = await fetch(`${BASE_URL}/location/list`);
	return res.json();
}

export async function fetchLocations(page: number, count?: number): Promise<Location[]> {
	const res = await fetch(`${BASE_URL}/location?page=${page}&count=${count ?? 10}`);
	return res.json();
}

export async function fetchLocationById(id: number): Promise<Location> {
	const res = await fetch(`${BASE_URL}/location/${id}`);
	return res.json();
}

export async function deleteLocationById(id: number): Promise<Response> {
	const res = await fetch(`${BASE_URL}/location/${id}`, {
		method: 'DELETE',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
	});

	return res;
}

export async function createLocation(location: LocationState): Promise<Response> {

	const res = await fetch(`${BASE_URL}/location`, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(location)
	});

	return res.json();
}

export async function updateLocation(id: number, location: LocationState): Promise<Response> {

	const res = fetch(`${BASE_URL}/location/${id}`, {
		method: 'PATCH',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(location)
	});

	return res;
}