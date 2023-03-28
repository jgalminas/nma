export function range(start: number, end: number) {
	let length = end - start + 1;
	return Array.from({ length }, (_, index) => index + start);
}