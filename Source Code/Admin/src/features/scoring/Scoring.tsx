import { useNavigate, useParams } from 'react-router';
import Content from '../../components/Content';
import PageHeading from '../../components/PageHeading';
import Image from '../../components/Image';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchDrawingById, fetchImage } from '../../api/sharedDrawing.api';
import H2Heading from '../../components/H2Heading';
import { Fragment, useReducer, useState } from 'react';
import ScorePanel from './ScorePanel';
import { CreateScore } from '../../admin.types';
import { createScore, fetchTopics } from './scoring.api';
import { useUser } from '../../contexts/UserContext';
import { fetchFirstUnscoredDrawing } from '../../api/sharedDrawing.api';
import { ScoreStateActionType, topicStateReducer as reducer } from './topicState.reducer';
import LinkPrimaryButton from '../../components/LinkPrimaryButton';
import LinkTextButton from '../../components/LinkTextButton';
import TextButton from '../../components/TextButton';

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
				
				{ drawing ?
					<Fragment>
						<div className='flex-grow px-7 pt-7 xl:p-7'>

						<H2Heading> Drawing </H2Heading>
						<h3 className='text-lg text-gray-600 mb-5'> { id } </h3>

						<Image isLoading={isImageLoading} url={image}/>
						</div>

						<div className='xl:h-[90%] xl:border-l border-gray-200 self-center'/>

						<ScorePanel {...scoreSelectorProps}/>
					</Fragment>
					: <div className='p-5 w-full h-full flex flex-col justify-center items-center gap-3'>
						<p className='text-gray-500'> No unscored drawings found. </p>
						<TextButton onClick={() => navigate(-1)}> Navigate Back </TextButton>
					</div>
				}

			</div>

		</Content>
	)
}