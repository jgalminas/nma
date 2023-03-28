import { Count, LocationIdName } from '../admin.types';
import { BASE_URL } from './api.config';

export async function fetchLocationCount(): Promise<Count> {
	const res = await fetch(`${BASE_URL}/location/count`);
	return res.json();
}

export async function fetchLocationList(): Promise<LocationIdName[]> {
	const res = await fetch(`${BASE_URL}/location/list`);
	return res.json();
}