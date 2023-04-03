import { useNavigate, useParams } from 'react-router';
import Panel from '../../Panel';
import { Fragment, useEffect, useState } from 'react';
import { EditDrawing, EditDrawingState, SelectOption } from '../../../admin.types';
import TextInput from '../../primitives/TextInput';
import PrimaryButton from '../../primitives/PrimaryButton';
import TextButton from '../../primitives/TextButton';
import Select from '../../primitives/Select';
import { fetchEventList } from '../../../api/event';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { validateAge, validateLength, validateSelectNotEmpty } from '../../../utils/validation';
import { useValidation } from '../../../hooks/validation';
import { usePage } from '../../../contexts/PageContext';
import { fetchDrawingById, updateDrawing } from '../../../api/drawing';

export default function EditDrawingPanel() {

	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { id } = useParams();	
	const { page } = usePage();

	const [error, setError] = useState<boolean>(false);
	const { data: eventList } = useQuery(['eventList'], fetchEventList);
	const [events, setEvents] = useState<SelectOption[]>([]);
	const [drawing, setDrawing] = useState<EditDrawingState>({
		event: { id: -1, value: 'Select event' },
		drawersName: '',
		drawersAge: 0,
	});

	const mutation = useMutation((editDrawing: EditDrawing) => updateDrawing(Number(id), editDrawing));

	// validation
	const { name, age, event } = useValidation({
		"name": { message: 'Name cannot be empty', isValid: true, validator: validateLength },
		"age": { message: 'Age must be between 0 and 120', isValid: true, validator: validateAge },
		"event": { message: 'Event cannot be empty', isValid: true, validator: validateSelectNotEmpty },
	});	

	// fetch event data when editing
	useEffect(() => {

		if (id) {

			queryClient.fetchQuery(["drawing", Number(id)], () => fetchDrawingById(Number(id)))
			.then((data) => {
				setDrawing({
					event: { id: data.event.id, value: data.event.name },
					drawersName: data.drawersName,
					drawersAge: data.drawersAge
				});
			})			
		}

	}, [id])

	useEffect(() => {

		// map the list of locations fetched from the api to select options
		const options: SelectOption[] = eventList?.map((l) => {
			return {
				id: l.id,
				value: l.name
			}
		}) ?? [];
		
		setEvents(options);

	}, [eventList])

	const navigateBack = () => navigate(-1);

	// update state
	const setAge = (value: string) => {
		age.validate(value);
		setDrawing({ ...drawing, drawersAge: Number(value) });
	};

	const setEvent = (selected: SelectOption) => {
		event.validate(selected);
		setDrawing({ ...drawing, event: selected })
	};

	const setName = (value: string) => {
		name.validate(value);
		setDrawing({ ...drawing, drawersName: value });
	};

	// on submit
	const submit = () => {
		
		setError(false);		

		if (name.validate(drawing.drawersName)
			&& age.validate(drawing.drawersAge)
			&& event.validate(drawing.event)) {			

			mutation.reset();

			// send network request
			mutation.mutate({
				eventId: drawing.event.id,
				drawersName: drawing.drawersName,
				drawersAge: drawing.drawersAge
			},
			{
				onSuccess: () => {
					
					queryClient.invalidateQueries(['drawings', page]);
					
					// navigate back
					navigate(`/drawings/${id}`);

				},
				onError: () => {
					setError(true);				
				}
			});

		}

	};
	

	return (
		<Fragment>
			<Panel.Header title='Edit Drawing'/>

			<div className='flex flex-col gap-5'>
				<TextInput value={drawing.drawersName} label="Drawer's Name" onChange={setName} validation={name.validation}/>
				<TextInput value={drawing.drawersAge === 0 ? '': drawing.drawersAge.toString()}
				label="Drawer's Age"
				onChange={setAge}
				validation={age.validation}
				type='number'
				max={3}/>
				<Select value={drawing.event} options={events} label='Event' onChange={setEvent} validation={event.validation}/>
			</div>
			

			<div className='mt-auto'>
				{ error && 
					<p className='w-full mt-auto text-right text-red-600'>
						Server Error. Could not update drawing.
					</p>
				}
				
				<div className='flex justify-end gap-3 pt-5'>
					<TextButton onClick={navigateBack}> Cancel </TextButton>
					<PrimaryButton disabled={mutation.isLoading} onClick={submit}> Update Drawing </PrimaryButton>
				</div>
			</div>

		</Fragment>
	)
}

