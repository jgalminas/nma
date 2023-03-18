export type Route = {
	text: string,
	route: string,
	icon: JSX.Element
}

export type Event = {
	eventId: number,
	locationId: number,
	eventName: number,
	notes: string,
	startTime: string | null,
	finishTime: string | null
}

export type Count = {
	count: number
}