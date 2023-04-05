import { useParams } from 'react-router';
import Content from '../../components/Content';
import PageHeading from '../../components/PageHeading';
import Image from '../../components/Image';
import { useQuery } from '@tanstack/react-query';
import { fetchDrawingById, fetchImage } from '../../api/sharedDrawing.api';
import H2Heading from '../../components/H2Heading';
import { useReducer, useState } from 'react';
import ScoreSelector from './ScoreSelector';

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

export interface ScoreState {
	notes: string,
	topics: TopicState[]
}

export const ScoreStateActionType = {
	CHECK: 'CHECK',
	UPDATE_NOTES: 'UPDATE_NOTES',
	UPDATE_DEPTH: 'UPDATE_DEPTH',
	UPDATE_EXTENT: 'UPDATE_EXTENT',
	UPDATE_DEPTH_NOTES: 'UPDATE_DEPTH_NOTES',
	UPDATE_EXTENT_NOTES: 'UPDATE_EXTENT_NOTES'
} as const

export type ScoreStateAction = 
	  { type: "CHECK", index: number }
	| { type: "UPDATE_NOTES", value: string }

const reducer = (state: ScoreState, action: ScoreStateAction) => {
	switch (action.type) {
		case ScoreStateActionType.CHECK:
			return {
				...state,
				topics: [
					...state.topics.slice(0, action.index),
					{ ...state.topics[action.index], checked: !state.topics[action.index].checked },
					...state.topics.slice(action.index + 1, state.topics.length)
				]
			}
		case ScoreStateActionType.UPDATE_NOTES:
			return {
				...state,
				notes: action.value
			}
		default:
			return state;
	}
}

export default function Scoring() {

	const [section, setSection] = useState<number>(-1);

	const [scores, dispatch] = useReducer(reducer, {
		notes: '',
		topics: [
			{ checked: false, topic: { id: 1, name: 'Marine Fauna' }, extent: 0, depth: 0, extentNotes: '', depthNotes: '' },
			{ checked: false, topic: { id: 2, name: 'Marine Flora' }, extent: 0, depth: 0, extentNotes: '', depthNotes: '' },
			{ checked: false, topic: { id: 3, name: 'Plymouth Landmarks' }, extent: 0, depth: 0, extentNotes: '', depthNotes: '' },
			{ checked: false, topic: { id: 4, name: 'Physical Features' }, extent: 0, depth: 0, extentNotes: '', depthNotes: '' },
			{ checked: false, topic: { id: 5, name: 'Marine Threats' }, extent: 0, depth: 0, extentNotes: '', depthNotes: '' },
			{ checked: false, topic: { id: 6, name: 'Marine Industry/Careers' }, extent: 0, depth: 0, extentNotes: '', depthNotes: '' },
			{ checked: false, topic: { id: 7, name: 'Recreational Activities' }, extent: 0, depth: 0, extentNotes: '', depthNotes: ''}
		]
	});

	const { id } = useParams();
	const { data: drawing } = useQuery(['drawing', Number(id)], () => fetchDrawingById(Number(id)));
	const { data: image, isLoading: isImageLoading } = useQuery(['image', Number(id)], () => fetchImage(drawing?.imageUrl ?? ''), { enabled: !!drawing });	

	const onSubmit = () => {
		console.log(1);
	}

	const scoreSelectorProps = {
		scores,
		dispatch,
		section,
		setSection,
		onSubmit
	}

	console.table(scores);

	return (
		<Content>

			<PageHeading> Scoring </PageHeading>

			<div className='xl:flex mt-7 bg-white flex-grow rounded-md border-gray-200 border'>
				
				<div className='flex-grow px-7 pt-7 xl:p-7'>

				<H2Heading> Drawing </H2Heading>
				<h3 className='text-lg text-gray-600 mb-5'> { id } </h3>
				
				<Image isLoading={isImageLoading} url={image}/>
				</div>

				<div className='xl:h-[90%] xl:border-l border-gray-200 self-center'/>

				<div>
					<ScoreSelector {...scoreSelectorProps}/>
				</div>

			</div>

		</Content>
	)
}