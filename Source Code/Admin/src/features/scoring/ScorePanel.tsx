import { Fragment } from 'react';
import Checkbox from '../../components/Checkbox';
import H2Heading from '../../components/H2Heading';
import PrimaryButton from '../../components/PrimaryButton';
import TextAreaInput from '../../components/TextAreaInput';
import TextButton from '../../components/TextButton';
import { TopicState } from './Scoring';
import ScoreSelector from './ScoreSelector';
import { ScoreStateAction, ScoreStateActionType } from './topicState.reducer';

export interface ScorePanelProps {
	scores: TopicState[],
	section: number,
	setSection: (num: number) => void,
	dispatch: React.Dispatch<ScoreStateAction>,
	onSubmit: () => void
}

export default function ScorePanel({ scores, dispatch, section, setSection, onSubmit }: ScorePanelProps) {

	const selectedTopics = scores.filter(s => s.checked);
	const shouldSubmit = section === selectedTopics.length - 1;
	const isOnBreadth = section === -1;
	const currentTopicId = selectedTopics[section]?.topic.id;

	// navigation
	const nextSection = () => section < selectedTopics.length - 1 && setSection(section + 1);
	const previousSection = () => section > -1 && setSection(section - 1);

	// state actions
	const onCheck = (index: number) => dispatch({ type: ScoreStateActionType.CHECK, index });
	const onScoreChange = (topicId: number, value: number, type: "UPDATE_EXTENT" | "UPDATE_DEPTH") => dispatch({ type, topicId, value });
	const onUpdateScoreNotes = (topicId: number, value: string, type: "UPDATE_EXTENT_NOTES" | "UPDATE_DEPTH_NOTES") => dispatch({ type, topicId, value });

	return (
		<div className='min-w-[20rem] xl:w-80 h-full overflow-y-auto p-7 flex flex-col'>

			<H2Heading>
				{ isOnBreadth ? 'Breadth Score': `${selectedTopics[section].topic.name} Score` }
			</H2Heading>

			{ isOnBreadth
				? <Fragment> 
					<div className='mt-5 flex flex-col gap-2'>
						{ scores.map((scr, key) => {
							return (
								<Checkbox key={key} label={scr.topic.name} checked={scr.checked} onChange={() => onCheck(key)}/>
							)
						}) }
					</div>
				</Fragment>
				: <div className='flex flex-col gap-5 mt-5'>
					<ScoreSelector label='Extent' value={selectedTopics[section].extent} withInput onChange={(value) => onScoreChange(currentTopicId, value, "UPDATE_EXTENT")}/>
					<TextAreaInput label='Extent Notes' rows={4} value={selectedTopics[section].extentNotes} onChange={(value) => onUpdateScoreNotes(currentTopicId, value, "UPDATE_EXTENT_NOTES")}/>
					<ScoreSelector label='Depth' value={selectedTopics[section].depth} onChange={(value) => onScoreChange(currentTopicId, value, "UPDATE_DEPTH")}/>
					<TextAreaInput label='Depth Notes' rows={4} value={selectedTopics[section].depthNotes} onChange={(value) => onUpdateScoreNotes(currentTopicId, value, "UPDATE_DEPTH_NOTES")}/>
				</div>
			}

			<div className='flex mt-auto justify-end gap-3'>
				{ section > -1 && <TextButton onClick={previousSection}> Previous </TextButton> }
				<PrimaryButton onClick={shouldSubmit ? onSubmit : nextSection}>
					{ shouldSubmit ? 'Submit Score' : 'Next' }
				</PrimaryButton>
			</div>
			
		</div>
	)
}