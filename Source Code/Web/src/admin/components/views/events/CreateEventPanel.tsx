import { useNavigate } from 'react-router';
import Panel from '../../Panel';
import { useEffect, useState } from 'react';
import { CreateEvent, EventState, SelectOption, Validation } from '../../../../types/admin.types';
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

export default function CreateEventPanel() {

	const navigate = useNavigate();
	
	const { data: locationsList } = useQuery('locationList', fetchLocationList);
	const [locations, setLoations] = useState<SelectOption[]>([]);
	const mutation = useMutation((event: CreateEvent) => createEvent(event));

	const [validation, setValidation] = useState<Record<string, Validation>>({
		"name": { message: 'Name cannot be empty', isValid: true },
		"startTime": { message: 'Start date/time must be selected', isValid: true },
		"finishTime": { message: 'Finish date/time must be selected', isValid: true },
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

	const [event, setEvent] = useState<EventState>({
		location: { id: -1, value: 'Select location' },
		eventName: '',
		notes: '',
		startTime: '',
		finishTime: ''
	});
	

	const validateName = (name: string) => {
		const isValid = validateLength(name);
		setValidation({ ...validation, "name": { ...validation["name"], isValid: validateLength(name) } });
		return isValid;
	};

	const validateStartTime = (date: string) => {
		const isValid = validateLength(date);
		setValidation({ ...validation, "startTime": { ...validation["startTime"], isValid: validateLength(date) } })
		return isValid;
	};

	const validateFinishTime = (date: string) => {
		const isValid = validateLength(date);
		setValidation({ ...validation, "finishTime": { ...validation["finishTime"], isValid: validateLength(date) } })
		return isValid;
	};


	const setLocation = (selected: SelectOption) => setEvent({ ...event, location: selected });
	const navigateBack = () => navigate('/admin/events');
	const setNotes = (notes: string) => setEvent({ ...event, notes: notes });

	const setName = (name: string) => {
		validateName(name);
		setEvent({ ...event, eventName: name });
	};

	const setStartTime = (date: string) => {
		validateStartTime(date);
		setEvent({ ...event, startTime: date })
	};

	const setFinishTime = (date: string) => {
		validateFinishTime(date);
		setEvent({ ...event, finishTime: date })
	};

	const createNewEvent = () => {
		
		if (validateFinishTime(event.finishTime)
			&& validateStartTime(event.startTime)
			&& validateName(event.eventName)) {
			
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

	}

	return (
		<Panel onClose={navigateBack}>
			
			<Panel.Header title='Create Event'/>

			<div className='flex flex-col gap-5'>
				<TextInput value={event.eventName ?? ''} label='Name' onChange={setName} validation={validation["name"]}/>
				<Select value={event.location} options={locations} label='Location' onChange={setLocation}/>
				<DatePicker value={event.startTime ?? ''} label='Start Time' onChange={setStartTime} validation={validation["startTime"]}/>
				<DatePicker value={event.finishTime ?? ''} label='Finish Time' onChange={setFinishTime} validation={validation["finishTime"]}/>
				<TextAreaInput value={event.notes} label='Notes' onChange={setNotes}/>
			</div>
			
			<div className='flex justify-end gap-3 pt-5 mt-auto'>
				<TextButton onClick={navigateBack}> Cancel </TextButton>
				<PrimaryButton onClick={createNewEvent}> Create Event </PrimaryButton>
			</div>
		</Panel>
	)
}