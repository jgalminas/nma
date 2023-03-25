import { useNavigate, useParams } from 'react-router';
import Panel from '../../Panel';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteEventById, fetchEventById } from '../../../../api/event';
import { DropdownOptions, Event } from '../../../../types/admin.types';
import Text from '../../primitives/Text';
import Dropdown from '../../primitives/Dropdown';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { getFriendlyDate } from '../../../utils/date';
import { Fragment, useState } from 'react';
import DeletePopup from '../../DeletePopup';
import { findItemInCacheArray } from '../../../utils/query';

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
					// find query cache which has the item
					const { queryKey, itemIndex } = findItemInCacheArray<Event>(queryClient, 'events', (i: Event) => i.eventId === Number(id))

					// update query cache
					if (queryKey && itemIndex) {
						queryClient.setQueryData(queryKey, (prev: any) => {

							return [
								...prev.slice(0, itemIndex),
								...prev.slice(itemIndex + 1)	
							]
						})
					}				

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