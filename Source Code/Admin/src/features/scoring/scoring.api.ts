import { CreateScore, Topic } from '../../admin.types';
import { BASE_URL } from '../../api/api.config';

export async function createScore(score: CreateScore): Promise<Response> {

	const res = await fetch(`${BASE_URL}/score`, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(score)
	});

	return res.json();
}

export async function fetchTopics(page: number, count?: number): Promise<Topic[]> {
	const res = await fetch(`${BASE_URL}/topic?page=${page}&count=${count ?? 10}`);
	return res.json();
}