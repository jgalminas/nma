export type Route = {
	text: string,
	route: string,
	icon: JSX.Element
}

export type CreateUpdateEvent = {
	locationId: number,
	eventName: string,
	notes: string,
	startTime: string,
	finishTime: string
}

export type Event = {
	eventId: number,
	location: {
		id: number,
		name: string
	},
	eventName: string,
	notes: string,
	startTime: string,
	finishTime: string
}

export type EventState = {
	location: SelectOption,
	eventName: string,
	notes: string,
	startTime: string,
	finishTime: string
}

export type Count = {
	count: number
}

export type DropdownOptions = {
	name: string,
	onClick: () => void
}

export type SelectOption = {
	id: number,
	value: string
}

export type LocationIdName = {
	id: number,
	name: string
}

export interface LocationState {
	city: string,
	country: string,
	locationName: string
}

export interface Location extends LocationState {
	locationId: number
}

export type TopicScore = {
	topicScoreId: number,
	topicName: string,
	depth: number,
	extent: number
}

export type Score = {
	scoreId: number,
	breadth: number,
	scoredBy: string,
	scoredAt: string,
	notes: string,
	topicScores: TopicScore[]
}

export interface Drawing {
	id: number,
	event: {
		id: number,
		name: string
	},
	createdAt: string,
	drawersName: string,
	drawersAge: number,
	isScored: boolean,
	imageUrl: string
}

export interface DrawingWithScores extends Drawing {
	scores: Score[]
}
