import { CreateEditScorer, Scorer } from '../../admin.types';
import { BASE_URL } from '../../api/api.config';

export async function fetchScorer(id: number): Promise<Scorer> {
	const res = await fetch(`${BASE_URL}/scorer/${id}`);
	return res.json();
}

export async function fetchScorers(): Promise<Scorer[]> {
	const res = await fetch(`${BASE_URL}/scorer`);
	return res.json();
}

export async function createScorer(scorer: CreateEditScorer): Promise<Response> {

	const res = await fetch(`${BASE_URL}/scorer`, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(scorer)
	});

	return res.json();
}

export async function updateScorer(id: number, scorer: CreateEditScorer): Promise<Response> {

	const res = await fetch(`${BASE_URL}/scorer/${id}`, {
		method: 'PATCH',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(scorer)
	});

	return res.json();
}

export async function deleteScorerById(id: number): Promise<Response> {

	const res = await fetch(`${BASE_URL}/scorer/${id}`, {
		method: 'DELETE',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
	});

	return res;
}