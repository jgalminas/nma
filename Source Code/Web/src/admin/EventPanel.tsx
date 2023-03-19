import { useNavigate, useParams } from 'react-router';
import Panel from './Panel';
import { useQuery } from 'react-query';
import { fetchEventById } from '../api/event';
import PANEL_MODE from './enums/panel';
import TextButton from './primitives/TextButton';
import PrimaryButton from './primitives/PrimaryButton';
import TextInput from './primitives/TextInput';
import DatePicker from './primitives/DatePicker';
import TextAreaInput from './primitives/TextAreaInput';

export interface EventPanelProps {
	mode?: number // for rendering buttons/components based on the action
}

export default function EventPanel({ mode = PANEL_MODE.VIEW }: EventPanelProps) {

	const { id } = useParams();
	const navigate = useNavigate();

	// react query test
	const { isLoading, isSuccess, data } = useQuery(`event-${id}`, () => fetchEventById(Number(id)));

	const navigateBack = () => navigate('/admin/events');

	return (
		<Panel onClose={navigateBack}>
			<div className='flex flex-col gap-5'>
				<TextInput label='Name' onChange={() => console.log()}/>
				<DatePicker label='Start Date' onChange={() => console.log()}/>
				<DatePicker label='Finish Date' onChange={() => console.log()}/>
				<TextAreaInput label='Notes' onChange={() => console.log(1)}/>
			</div>

			<div className='flex justify-end gap-3 pt-5 mt-auto'>
				<TextButton onClick={navigateBack}> Cancel </TextButton>
				{ mode == PANEL_MODE.CREATE && <PrimaryButton> Create Event </PrimaryButton> }
				{ mode == PANEL_MODE.EDIT && <PrimaryButton> Edit Event </PrimaryButton> }
			</div>
		</Panel>
	)
}