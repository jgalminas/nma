import { useNavigate } from 'react-router';
import Panel from '../../Panel';
import { useEffect, useState } from 'react';
import { CreateEvent, EventState, SelectOption } from '../../../../types/admin.types';
import TextInput from '../../primitives/TextInput';
import DatePicker from '../../primitives/DatePicker';
import TextAreaInput from '../../primitives/TextAreaInput';
import PrimaryButton from '../../primitives/PrimaryButton';
import TextButton from '../../primitives/TextButton';
import Select from '../../primitives/Select';
import { createEvent } from '../../../../api/event';
import { useMutation, useQuery } from 'react-query';
import { fetchLocationList } from '../../../../api/location';
import { validateLength } from '../../../utils/validation';
import { useValidation } from '../../../hooks/validation';

export default function CreateEventPanel() {

	const navigate = useNavigate();
	
	const { data: locationsList } = useQuery('locationList', fetchLocationList);
	const [locations, setLoations] = useState<SelectOption[]>([]);
	const [event, setEvent] = useState<EventState>({
		location: { id: -1, value: 'Select location' },
		eventName: '',
		notes: '',
		startTime: '',
		finishTime: ''
	});

	const mutation = useMutation((event: CreateEvent) => createEvent(event));

	// validation
	const { name, startTime, finishTime } = useValidation({
		"name": { message: 'Name cannot be empty', isValid: true, validator: validateLength },
		"startTime": { message: 'Start date/time must be selected', isValid: true, validator: validateLength },
		"finishTime": { message: 'Finish date/time must be selected', isValid: true, validator: validateLength },
	});	

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

	const navigateBack = () => navigate('/admin/events');

	// update state
	const setLocation = (selected: SelectOption) => setEvent({ ...event, location: selected });
	const setNotes = (notes: string) => setEvent({ ...event, notes: notes });

	const setName = (value: string) => {
		name.validate(value);
		setEvent({ ...event, eventName: value });
	};

	const setStartTime = (date: string) => {
		startTime.validate(date);
		setEvent({ ...event, startTime: date })
	};

	const setFinishTime = (date: string) => {
		finishTime.validate(date);
		setEvent({ ...event, finishTime: date })
	};

	// on submit
	const createNewEvent = () => {
		
		if (name.validate(event.finishTime)
			&& startTime.validate(event.startTime)
			&& finishTime.validate(event.finishTime)) {
			
			// sent network request
			mutation.mutate({
				locationId: event.location.id,
				eventName: event.eventName,
				notes: event.notes,
				startTime: event.startTime,
				finishTime: event.finishTime
			});

			navigateBack();
		}

	};
	

	return (
		<Panel onClose={navigateBack}>

			<Panel.Header title='Create Event'/>

			<div className='flex flex-col gap-5'>
				<TextInput value={event.eventName ?? ''} label='Name' onChange={setName} validation={name.validation}/>
				<Select value={event.location} options={locations} label='Location' onChange={setLocation}/>
				<DatePicker value={event.startTime ?? ''} label='Start Time' onChange={setStartTime} validation={startTime.validation}/>
				<DatePicker value={event.finishTime ?? ''} label='Finish Time' onChange={setFinishTime} validation={finishTime.validation}/>
				<TextAreaInput value={event.notes} label='Notes' onChange={setNotes}/>
			</div>
			
			<div className='flex justify-end gap-3 pt-5 mt-auto'>
				<TextButton onClick={navigateBack}> Cancel </TextButton>
				<PrimaryButton onClick={createNewEvent}> Create Event </PrimaryButton>
			</div>
		</Panel>
	)
}