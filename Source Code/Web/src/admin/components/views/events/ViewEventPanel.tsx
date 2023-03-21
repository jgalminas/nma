import { useNavigate, useParams } from 'react-router';
import Panel from '../../Panel';
import { useQuery } from 'react-query';
import { fetchEventById } from '../../../../api/event';
import { useEffect, useState } from 'react';
import { DropdownOptions, Event } from '../../../../types/admin.types';
import Text from '../../primitives/Text';

export default function ViewEventPanel() {

	const { id } = useParams();
	const navigate = useNavigate();

	const { isLoading, data } = useQuery(`event-${id}`, () => fetchEventById(Number(id)));
	
	const [event, setEvent] = useState<Event>({
		eventId: 0,
		locationId: 0,
		eventName: '',
		notes: '',
		startTime: '',
		finishTime: ''
	});

	const options: DropdownOptions[] = [
		{ name: 'Edit', onClick: () => navigateToEdit() },
		{ name: 'Delete', onClick: () => deleteEvent() }
	];

	useEffect(() => {
		setEvent(data!);
	}, [isLoading])

	const deleteEvent = () => {
		//TO DO - delete
		navigateBack();
	} 
	const navigateToEdit = () => navigate(`/admin/events/edit/${event.eventId}`);
	const navigateBack = () => navigate('/admin/events');

	return (
		<Panel onClose={navigateBack}>
			
			<Panel.Header options={options}> Event Details </Panel.Header>
			<div className='flex flex-col gap-5'>
				<Text label='Name'> { event?.eventName ?? '-' } </Text>
				<Text label='Start Date'> { event?.startTime ?? '-' } </Text>
				<Text label='Finish Date'> { event?.finishTime ?? '-' } </Text>
				<Text label='Notes'> { event?.notes ?? '-' } </Text>
			</div>
		</Panel>
	)
}


{/* <div className='flex flex-col gap-5'>
<TextInput value={event?.eventName ?? ''} label='Name' onChange={() => console.log()}/>
<DatePicker value={event?.startTime ?? ''} label='Start Date' onChange={() => console.log()}/>
<DatePicker value={event?.finishTime ?? ''} label='Finish Date' onChange={() => console.log()}/>
<TextAreaInput value={event?.notes} label='Notes' onChange={() => console.log(1)}/>

<Text label='Name'> { event?.eventName ?? '-' } </Text>
<Text label='Start Date'> { event?.startTime ?? '-' } </Text>
<Text label='Finish Date'> { event?.finishTime ?? '-' } </Text>
<Text label='Notes'> { event?.notes ?? '-' } </Text>
</div>

<div className='flex justify-end gap-3 pt-5 mt-auto'>
<TextButton onClick={navigateBack}> Cancel </TextButton>
{ mode == PANEL_MODE.CREATE && <PrimaryButton> Create Event </PrimaryButton> }
{ mode == PANEL_MODE.EDIT && <PrimaryButton> Edit Event </PrimaryButton> }
</div> */}