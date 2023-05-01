
/**
 * Given a start and finish number, generate a sequence of numbers inbetween.
 * @param start 
 * @param end 
 * @returns array of numbers
 */
export function range(start: number, end: number) {
	let length = end - start + 1;
	return Array.from({ length }, (_, index) => index + start);
}