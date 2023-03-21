export type Ref = React.RefObject<HTMLElement>;

export type Route = {
	text: string,
	route: string,
	icon: JSX.Element
}

export type Event = {
	eventId: number,
	locationId: number,
	eventName: string,
	notes: string,
	startTime: string | null,
	finishTime: string | null
}

export type EventState = {
	location: SelectOption,
	eventName: string,
	notes: string,
	startTime: string | null,
	finishTime: string | null
}

export type Count = {
	count: number
}

export type Drawing = {
	id: number,
	event: {
		id: number,
		name: string
	},
	createdAt: string,
	drawersName: string,
	drawersAge: number
}

export type DropdownOptions = {
	name: string,
	onClick: () => void
}

export type SelectOption = {
	id: number,
	value: string
}