import { useNavigate, useParams } from 'react-router';
import Panel from '../../components/Panel';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteEventById, fetchEventById } from './event.api';
import { DropdownOptions, Event } from '../../admin.types';
import Text from '../../components/Text';
import Dropdown from '../../components/Dropdown';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { getFriendlyDate } from '../../utils/date';
import { Fragment, useState } from 'react';
import DeletePopup from '../../components/DeletePopup';
import { usePage } from '../../contexts/PageContext';

export default function ViewEventPanel() {

	// navigation props/hoopks
	const { id } = useParams();
	const navigate = useNavigate();

	// query props/hooks
	const queryClient = useQueryClient();
	const { data: event } = useQuery(['event', Number(id)], () => fetchEventById(Number(id)));
	const mutation = useMutation(['deleteEvent', Number(id)], deleteEventById);

	// state
	const [popup, setPopup] = useState(false);
	const { page, setPage } = usePage();
	
	// dropdown menu options 
	const options: DropdownOptions[] = [
		{ name: 'Edit', onClick: () => navigateToEdit() },
		{ name: 'Delete', onClick: () => deleteEvent() }
	];

	// navigation functions
	const navigateToEdit = () => navigate(`edit`);
	const navigateBack = () => navigate(-1);

	// delete functions
	const deleteEvent = () => { 
		setPopup(true);
		mutation.reset();
	}
	const cancelDelete = () => setPopup(false);
	const confirmDelete = () => {

		// sent network request
		mutation.mutate(Number(id),
		{
			onSuccess: (res) => {

				if (res.ok) {
					
					queryClient.setQueryData<Event[]>(['events', page], (prev) => {

						if (prev) {
							
							const itemIndex = prev.findIndex(i => i.eventId === Number(id));						

							// check for page length
							if (prev.length === 1) {
								setPage(page !== 0? page - 1: 0);							
							}

							return [
								...prev.slice(0, itemIndex),
								...prev.slice(itemIndex + 1)
							]
						}

						return [];

					});

					queryClient.invalidateQueries(['eventCount']);

					// navigate back
					navigateBack();
				}

			}
		});

	}

	return (
		<Fragment>

			{ popup && <DeletePopup onClose={cancelDelete} onConfirm={confirmDelete} isError={mutation.data?.status === 500} isLoading={mutation.isLoading}/> }

			<Panel.Header title='Event Details'>
				<Dropdown button={<EllipsisVerticalIcon className='w-6 h-6 text-gray-500'/>} options={options}/>
			</Panel.Header>

			<div className='flex flex-col gap-5'>
				<Text label='ID'> { event?.eventId ?? '-' } </Text>
				<Text label='Name'> { event?.eventName ?? '-' } </Text>
				<Text label='Start Time'> { event && getFriendlyDate(event?.startTime)  } </Text>
				<Text label='Finish Time'> { event && getFriendlyDate(event?.finishTime)  } </Text>
				<Text label='Notes'> { event?.notes ?? '-' } </Text>
			</div>
		</Fragment>
	)
}