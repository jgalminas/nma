import { useNavigate } from 'react-router';
import Panel from '../../Panel';
import { useEffect, useState } from 'react';
import { CreateEvent, Event, EventState, SelectOption } from '../../../../types/admin.types';
import TextInput from '../../primitives/TextInput';
import DatePicker from '../../primitives/DatePicker';
import TextAreaInput from '../../primitives/TextAreaInput';
import PrimaryButton from '../../primitives/PrimaryButton';
import TextButton from '../../primitives/TextButton';
import Select from '../../primitives/Select';
import { createEvent } from '../../../../api/event';
import { useMutation, useQuery } from 'react-query';
import { fetchLocationList } from '../../../../api/location';

export default function CreateEventPanel() {

	const navigate = useNavigate();
	
	const { data: locationsList } = useQuery('locationList', fetchLocationList);
	const [locations, setLoations] = useState<SelectOption[]>([]);
	const mutation = useMutation((event: CreateEvent) => createEvent(event));


	useEffect(() => {

		// map the list of locations fetched from the api to select options
		const options: SelectOption[] = locationsList?.map((l) => {
			return {
				id: l.id,
				value: l.name
			}
		}) ?? [];
		
		setLoations(options);

	}, [locationsList])

	const [event, setEvent] = useState<EventState>({
		location: { id: -1, value: 'Select location'},
		eventName: '',
		notes: '',
		startTime: '',
		finishTime: ''
	});
	

	const navigateBack = () => navigate('/admin/events');
	const setName = (name: string) => setEvent({ ...event, eventName: name });
	const setLocation = (selected: SelectOption) => setEvent({ ...event, location: selected });
	const setStartTime = (date: string) => setEvent({ ...event, startTime: date });
	const setFinishTime = (date: string) => setEvent({ ...event, finishTime: date });
	const setNotes = (notes: string) => setEvent({ ...event, notes: notes });

	const createNewEvent = async() => {
		
		mutation.mutateAsync({
			locationId: event.location.id,
			eventName: event.eventName,
			notes: event.notes,
			startTime: event.startTime,
			finishTime: event.finishTime
		});

		navigateBack();
	}

	return (
		<Panel onClose={navigateBack}>
			
			<Panel.Header title='Create Event'/>

			<div className='flex flex-col gap-5'>
				<TextInput value={event.eventName ?? ''} label='Name' onChange={setName}/>
				<Select value={event.location} options={locations} label='Location' onChange={setLocation}/>
				<DatePicker value={event.startTime ?? ''} label='Start Time' onChange={setStartTime}/>
				<DatePicker value={event.finishTime ?? ''} label='Finish Time' onChange={setFinishTime}/>
				<TextAreaInput value={event.notes} label='Notes' onChange={setNotes}/>
			</div>
			
			<div className='flex justify-end gap-3 pt-5 mt-auto'>
				<TextButton onClick={navigateBack}> Cancel </TextButton>
				<PrimaryButton onClick={createNewEvent}> Create Event </PrimaryButton>
			</div>
		</Panel>
	)
}