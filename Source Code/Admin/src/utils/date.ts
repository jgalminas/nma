export function getFriendlyDate(date: string): string {

	const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const dateObj = new Date(date);
	return `${dateObj.getDate()} ${MONTHS[dateObj.getMonth()]}, ${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
}