import { SelectOption } from '../admin.types';

export function validateLength(value: string | null) {
	return value?.trim().length !== 0;
}

export function validateSelectNotEmpty(option: SelectOption) {
	return option.id != -1;
}

export function validateAge(value: string | number) {
	if (typeof value === 'number') {
		return Number(value) > 0 && Number(value) < 121;
	} else {
		return value?.trim().length !== 0 && Number(value) > 0 && Number(value) < 121;
	}
}