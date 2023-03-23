import { useState } from 'react';

export type Validation = {
	message: string,
	isValid: boolean,
	validator: (value: any) => boolean
}

export function useValidation(config: Record<string, Validation>) {

	const [state, setState] = useState<Record<string, Validation>>(config);

	return Object.fromEntries(
		Object.keys(state).map((it) => {
			return [it, {
				validation: state[it],
				validate: (value: any) => {
					const isValid = state[it].validator(value);
					setState({ ...state, [it]: { ...state[it], isValid } });
					return isValid;
				}
			}]
		})
	)
}