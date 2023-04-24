import { useNavigate, useParams } from 'react-router';
import Content from '../../components/Content';
import PageHeading from '../../components/PageHeading';
import Image from '../../components/Image';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchDrawingById, fetchImage } from '../../api/sharedDrawing.api';
import H2Heading from '../../components/H2Heading';
import { useReducer, useState } from 'react';
import ScorePanel from './ScorePanel';
import { CreateScore } from '../../admin.types';
import { createScore, fetchTopics } from './scoring.api';
import { useUser } from '../../contexts/UserContext';
import { fetchFirstUnscoredDrawing } from '../../api/sharedDrawing.api';

export interface TopicState {
	checked: boolean,
	topic: {
		id: number,
		name: string
	},
	extent: number,
	extentNotes: string,
	depth: number,
	depthNotes: string
}

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
	| { type: "UPDATE_NOTES", value: string }
	| { type: "UPDATE_EXTENT" | "UPDATE_DEPTH", topicId: number, value: number }
	| { type: "UPDATE_EXTENT_NOTES" | "UPDATE_DEPTH_NOTES", topicId: number, value: string }
	| { type: "SET_TOPICS", topics: TopicState[] }

const reducer = (state: TopicState[], action: ScoreStateAction) => {
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
		default:
			return state;
	}
}

export default function Scoring() {

	const { user } = useUser(); 
	const [section, setSection] = useState<number>(-1);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [scores, dispatch] = useReducer(reducer, []);

	const { id } = useParams();
	const { data: drawing } = useQuery({
		queryKey: id != undefined ? ['drawing', Number(id)] : ['randomDrawing'],
		queryFn: id != undefined ? () => fetchDrawingById(Number(id)) : fetchFirstUnscoredDrawing
	});
	
	useQuery(['topics'], () => fetchTopics(0, 20), {
		onSuccess: (topics) => {
			dispatch({
				type: ScoreStateActionType.SET_TOPICS,
				topics: topics.map((t) => ({
					checked: false,
					topic: { id: t.topicId, name: t.topicName },
					extent: 0,
					depth: 0,
					extentNotes: '',
					depthNotes: ''
				}))
			});
		},
		refetchInterval: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false
	});

	const { data: image, isLoading: isImageLoading } = useQuery(['image', drawing?.id], () => fetchImage(drawing?.imageUrl ?? ''), {
		enabled: !!drawing,
		refetchInterval: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false
	});
	
	const mutation = useMutation((score: CreateScore) => createScore(score));

	const onSubmit = () => {

		mutation.mutate({
			scorerId: user?.id ?? -1,
			drawingId: drawing?.id ?? -1,
			topicScores: scores.filter((t) => t.checked).map(t => {
				return {
					topicId:t.topic.id,
					extent: t.extent,
					depth: t.depth,
					depthNotes: t.depthNotes,
					extentNotes: t.extentNotes }
			})
		}, {
			onSuccess: () => {
				queryClient.invalidateQueries(["drawings", 0]);
				navigate('/drawings');
			}
		});	

	}

	const scoreSelectorProps = {
		scores,
		dispatch,
		section,
		setSection,
		onSubmit
	}

	return (
		<Content>

			<PageHeading> Scoring </PageHeading>

			<div className='xl:flex mt-7 bg-white flex-grow rounded-md border-gray-200 border overflow-x-auto'>
				
				<div className='flex-grow px-7 pt-7 xl:p-7'>

				<H2Heading> Drawing </H2Heading>
				<h3 className='text-lg text-gray-600 mb-5'> { id } </h3>
				
				<Image isLoading={isImageLoading} url={image}/>
				</div>

				<div className='xl:h-[90%] xl:border-l border-gray-200 self-center'/>

				<ScorePanel {...scoreSelectorProps}/>


			</div>

		</Content>
	)
}