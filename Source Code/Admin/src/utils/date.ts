
/**
 * Convert a date/time string to a more visually friendly date/time string.
 * @param date 
 * @returns visually friendly string eg. 15 May, 2023 10:12
 */
export function getFriendlyDate(date: string): string {

	const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const dateObj = new Date(date);

	const minutes = dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : dateObj.getMinutes();
	const hours = dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : dateObj.getHours();

		return `${dateObj.getDate()} ${MONTHS[dateObj.getMonth()]}, ${dateObj.getFullYear()} ${ hours }:${ minutes }`;
}