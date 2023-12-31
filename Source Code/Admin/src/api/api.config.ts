export const BASE_URL = 'http://localhost:5000/api';

const { fetch: _fetch } = window;

type Args = [
	input: RequestInfo | URL,
	init?: RequestInit | undefined
]

window.fetch = async (...args) => {

	args = applyAuthorizationHeader(args);	

	const response = await _fetch(...args);

	return response;
};


const applyAuthorizationHeader = ([ resources, config ]: Args): Args => {
	if (!config) {
		config = {
			headers: {
				"x-api-key": process.env.VITE_API_KEY
			}
		}
	} else {
		config.headers = {
			...config.headers,
			"x-api-key": process.env.VITE_API_KEY
		} 
	}

	return [resources, config];
}
