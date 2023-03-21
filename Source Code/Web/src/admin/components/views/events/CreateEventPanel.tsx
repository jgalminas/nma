import { useNavigate } from 'react-router';
import Panel from '../../Panel';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { Event, SelectOption } from '../../../../types/admin.types';
import TextInput from '../../primitives/TextInput';
import DatePicker from '../../primitives/DatePicker';
import TextAreaInput from '../../primitives/TextAreaInput';
import PrimaryButton from '../../primitives/PrimaryButton';
import TextButton from '../../primitives/TextButton';
import Select from '../../primitives/Select';

export default function CreateEventPanel() {

	const navigate = useNavigate();
	
	const locations: SelectOption[] = [
		{ id: 1, value: 'One' },
		{ id: 2, value: 'Two' }
	];

	const [event, setEvent] = useState<Event>({
		locationId: null,
		eventName: '',
		notes: '',
		startTime: '',
		finishTime: ''
	});


	const navigateBack = () => navigate('/admin/events');
	const setName = (name: string) => setEvent({ ...event, eventName: name });
	const setLocation = (option: SelectOption) => setEvent({ ...event, locationId: option.id });
	const setStartTime = (date: string | null) => setEvent({ ...event, startTime: date });
	const setFinishTime = (date: string | null) => setEvent({ ...event, finishTime: date });
	const setNotes = (notes: string) => setEvent({ ...event, notes: notes });

	return (
		<Panel onClose={navigateBack}>
			
			<Panel.Header title='Create Event'/>

			<div className='flex flex-col gap-5'>
				<TextInput value={event?.eventName ?? ''} label='Name' onChange={setName}/>
				<Select value='Select location' options={locations} onChange={setLocation}/>
				<DatePicker value={event?.startTime ?? ''} label='Start Time' onChange={setStartTime}/>
				<DatePicker value={event?.finishTime ?? ''} label='Finish Time' onChange={setFinishTime}/>
				<TextAreaInput value={event?.notes} label='Notes' onChange={setNotes}/>
			</div>
			
			<div className='flex justify-end gap-3 pt-5 mt-auto'>
				<TextButton onClick={navigateBack}> Cancel </TextButton>
				<PrimaryButton> Create Event </PrimaryButton>
			</div>
		</Panel>
	)
}

{/* <div className='flex flex-col gap-5'>
<TextInput value={event?.eventName ?? ''} label='Name' onChange={() => console.log()}/>
<DatePicker value={event?.startTime ?? ''} label='Start Date' onChange={() => console.log()}/>
<DatePicker value={event?.finishTime ?? ''} label='Finish Date' onChange={() => console.log()}/>
<TextAreaInput value={event?.notes} label='Notes' onChange={() => console.log(1)}/>

</div>

<div className='flex justify-end gap-3 pt-5 mt-auto'>
<TextButton onClick={navigateBack}> Cancel </TextButton>
{ mode == PANEL_MODE.CREATE && <PrimaryButton> Create Event </PrimaryButton> }
{ mode == PANEL_MODE.EDIT && <PrimaryButton> Edit Event </PrimaryButton> }
</div> */}