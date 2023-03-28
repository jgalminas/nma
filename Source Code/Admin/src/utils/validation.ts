import { SelectOption } from '../admin.types';

export function validateLength(value: string | null) {
	return value?.trim().length !== 0;
}

export function validateLocation(option: SelectOption) {
	return option.id != -1;
}