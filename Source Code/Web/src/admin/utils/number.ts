export const range = (start: number, end: number) => {
	var length = end - start + 1;
	return Array.from({ length }, (_, index) => index + start);
}