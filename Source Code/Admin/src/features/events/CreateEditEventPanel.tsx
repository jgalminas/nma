import { useNavigate, useParams } from 'react-router';
import Panel from '../../components/Panel';
import { Fragment, useEffect, useState } from 'react';
import { CreateUpdateEvent, Event, EventState, SelectOption } from '../../admin.types';
import TextInput from '../../components/TextInput';
import DatePicker from '../../components/DatePicker';
import TextAreaInput from '../../components/TextAreaInput';
import PrimaryButton from '../../components/PrimaryButton';
import TextButton from '../../components/TextButton';
import Select from '../../components/Select';
import { createEvent, fetchEventById, updateEvent } from './event.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchLocationList } from '../locations/location.api';
import { validateLength, validateSelectNotEmpty } from '../../utils/validation';
import { useValidation } from '../../hooks/validation';
import { findItemInCacheArray } from '../../utils/query';
import { usePage } from '../../contexts/PageContext';

export default function CreateEditEventPanel() {

	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { id } = useParams();	
	const { page } = usePage();

	const [error, setError] = useState<boolean>(false);
	const { data: locationsList } = useQuery(['locationList'], fetchLocationList);
	const [locations, setLocations] = useState<SelectOption[]>([]);
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
		"location": { message: 'Location cannot be empty', isValid: true, validator: validateSelectNotEmpty },
	});	

	// fetch event data when editing
	useEffect(() => {

		if (id) {

			queryClient.fetchQuery(["event", Number(id)], () => fetchEventById(Number(id)))
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
		
		setLocations(options);

	}, [locationsList])

	const navigateBack = () => navigate(-1);

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
		
		setError(false);		

		if (name.validate(event.eventName)
			&& location.validate(event.location)
			&& startTime.validate(event.startTime)
			&& finishTime.validate(event.finishTime)) {
			
			mutation.reset();

			// send network request
			mutation.mutate({
				locationId: event.location.id,
				eventName: event.eventName,
				notes: event.notes,
				startTime: event.startTime,
				finishTime: event.finishTime
			},
			{
				onSuccess: () => {
					
					// find query cache which has the item
					const { queryKey, itemIndex } = findItemInCacheArray<Event>(queryClient, 'events', (i: Event) => i.eventId === Number(id))

					// update query cache
					if (queryKey && itemIndex) {
						queryClient.setQueryData(queryKey, (prev: any) => {
	
							return [
								...prev.slice(0, itemIndex),
								{
									eventId: Number(id),
									location: event.location,
									eventName: event.eventName,
									notes: event.notes,
									startTime: event.startTime,
									finishTime: event.finishTime
								},
								...prev.slice(itemIndex + 1)	
							]
						})

						queryClient.invalidateQueries(['eventCount']);		

					} else {							
						queryClient.invalidateQueries(['events', page]);
					}

					// navigate back
					if (id) {
						navigate(`/events/${id}`);
					} else {
						navigateBack();
					}

				},
				onError: () => {
					setError(true);				
				}
			});

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
			

			<div className='mt-auto'>
				{ error && 
					<p className='w-full mt-auto text-right text-red-600'>
						Server Error. Could not create event.
					</p>
				}
				
				<div className='flex justify-end gap-3 pt-5'>
					<TextButton onClick={navigateBack}> Cancel </TextButton>
					<PrimaryButton disabled={mutation.isLoading} onClick={submit}> { id ? 'Update Event' : 'Create Event' } </PrimaryButton>
				</div>
			</div>

		</Fragment>
	)
}

