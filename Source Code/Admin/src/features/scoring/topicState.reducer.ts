import { TopicState } from './Scoring';

export const ScoreStateActionType = {
	CHECK: 'CHECK',
	UPDATE_DEPTH: 'UPDATE_DEPTH',
	UPDATE_EXTENT: 'UPDATE_EXTENT',
	UPDATE_DEPTH_NOTES: 'UPDATE_DEPTH_NOTES',
	UPDATE_EXTENT_NOTES: 'UPDATE_EXTENT_NOTES',
	SET_TOPICS: 'SET_TOPICS'
} as const

export type ScoreStateAction = 
	  { type: "CHECK", index: number }
	| { type: "UPDATE_EXTENT" | "UPDATE_DEPTH", topicId: number, value: number }
	| { type: "UPDATE_EXTENT_NOTES" | "UPDATE_DEPTH_NOTES", topicId: number, value: string }
	| { type: "SET_TOPICS", topics: TopicState[] }

export const topicStateReducer = (state: TopicState[], action: ScoreStateAction) => {
	switch (action.type) {
		case ScoreStateActionType.CHECK:
			return [
				...state.slice(0, action.index),
				{ ...state[action.index], checked: !state[action.index].checked },
				...state.slice(action.index + 1, state.length)
			]
		case ScoreStateActionType.UPDATE_EXTENT: 
		case ScoreStateActionType.UPDATE_DEPTH:

			var score = action.type === ScoreStateActionType.UPDATE_EXTENT ? 'extent' : 'depth';	
			var topic = state.find(t => t.topic.id === action.topicId);
			var topicIndex = (topic && state.indexOf(topic)) ?? -1;

			return [
				...state.slice(0, topicIndex),
				{ ...state[topicIndex], [score]: action.value },
				...state.slice(topicIndex + 1, state.length)
			]
		case ScoreStateActionType.UPDATE_EXTENT_NOTES: 
		case ScoreStateActionType.UPDATE_DEPTH_NOTES:

			var scoreNotes = action.type === ScoreStateActionType.UPDATE_EXTENT_NOTES ? 'extentNotes' : 'depthNotes';	
			var topic = state.find(t => t.topic.id === action.topicId);
			var topicIndex = (topic && state.indexOf(topic)) ?? -1;

			return [
				...state.slice(0, topicIndex),
				{ ...state[topicIndex], [scoreNotes]: action.value },
				...state.slice(topicIndex + 1, state.length)
			]
		case ScoreStateActionType.SET_TOPICS:
			return action.topics;
	}
}