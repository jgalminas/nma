import { useNavigate, useParams } from 'react-router';
import Panel from '../../Panel';
import { Fragment, useEffect, useState } from 'react';
import { CreateUpdateEvent, EventState, SelectOption } from '../../../../types/admin.types';
import TextInput from '../../primitives/TextInput';
import DatePicker from '../../primitives/DatePicker';
import TextAreaInput from '../../primitives/TextAreaInput';
import PrimaryButton from '../../primitives/PrimaryButton';
import TextButton from '../../primitives/TextButton';
import Select from '../../primitives/Select';
import { createEvent, fetchEventById, updateEvent } from '../../../../api/event';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchLocationList } from '../../../../api/location';
import { validateLength, validateLocation } from '../../../utils/validation';
import { useValidation } from '../../../hooks/validation';

export default function CreateEditEventPanel() {

	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { id } = useParams();	

	
	const { data: locationsList } = useQuery('locationList', fetchLocationList);
	const [locations, setLoations] = useState<SelectOption[]>([]);
	const [event, setEvent] = useState<EventState>({
		location: { id: -1, value: 'Select location' },
		eventName: '',
		notes: '',
		startTime: '',
		finishTime: ''
	});

	const mutation = useMutation(id
		? (event: CreateUpdateEvent) => updateEvent(Number(id), event)
		: (event: CreateUpdateEvent) => createEvent(event));

	// validation
	const { name, startTime, finishTime, location } = useValidation({
		"name": { message: 'Name cannot be empty', isValid: true, validator: validateLength },
		"startTime": { message: 'Start date/time must be selected', isValid: true, validator: validateLength },
		"finishTime": { message: 'Finish date/time must be selected', isValid: true, validator: validateLength },
		"location": { message: 'Location cannot be empty', isValid: true, validator: validateLocation },
	});	

	// fetch event when editing
	useEffect(() => {

		if (id) {

			queryClient.fetchQuery(["event", id], () => fetchEventById(Number(id)))
			.then((data) => {
				setEvent({
					location: { id: data.location.id, value: data.location.name },
					eventName: data.eventName,
					notes: data.notes,
					startTime: data.startTime,
					finishTime: data.finishTime
				});
			})			
		}

	}, [id])

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
	const setNotes = (notes: string) => setEvent({ ...event, notes: notes });

	const setLocation = (selected: SelectOption) => {
		location.validate(selected);
		setEvent({ ...event, location: selected })
	};

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
	const submit = () => {
		
		if (name.validate(event.eventName)
			&& location.validate(event.location)
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

			if (id) {
				navigate(`/admin/events/${id}`);
			} else {
				navigateBack();
			}
		}

	};
	

	return (
		<Fragment>
			<Panel.Header title={`${id ? 'Edit' : 'Create'} Event`}/>

			<div className='flex flex-col gap-5'>
				<TextInput value={event.eventName ?? ''} label='Name' onChange={setName} validation={name.validation}/>
				<Select value={event.location} options={locations} label='Location' onChange={setLocation} validation={location.validation}/>
				<DatePicker value={event.startTime ?? ''} label='Start Time' onChange={setStartTime} validation={startTime.validation}/>
				<DatePicker value={event.finishTime ?? ''} label='Finish Time' onChange={setFinishTime} validation={finishTime.validation}/>
				<TextAreaInput value={event.notes} label='Notes' onChange={setNotes}/>
			</div>
			
			<div className='flex justify-end gap-3 pt-5 mt-auto'>
				<TextButton onClick={navigateBack}> Cancel </TextButton>
				<PrimaryButton onClick={submit}> { id ? 'Update Event' : 'Create Event' } </PrimaryButton>
			</div>
		</Fragment>
	)
}