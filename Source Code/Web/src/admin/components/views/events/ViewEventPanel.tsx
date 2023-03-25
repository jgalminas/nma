import { useNavigate, useParams } from 'react-router';
import Panel from '../../Panel';
import { useQuery } from '@tanstack/react-query';
import { fetchEventById } from '../../../../api/event';
import { DropdownOptions } from '../../../../types/admin.types';
import Text from '../../primitives/Text';
import Dropdown from '../../primitives/Dropdown';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { getFriendlyDate } from '../../../utils/date';
import { Fragment } from 'react';

export default function ViewEventPanel() {

	const { id } = useParams();
	const navigate = useNavigate();

	const { data: event } = useQuery(['event', Number(id)], () => fetchEventById(Number(id)));
	
	const options: DropdownOptions[] = [
		{ name: 'Edit', onClick: () => navigateToEdit() },
		{ name: 'Delete', onClick: () => deleteEvent() }
	];

	const deleteEvent = () => {
		//TO DO - delete
		navigateBack();
	} 
	const navigateToEdit = () => navigate(`edit`);
	const navigateBack = () => navigate('/admin/events');

	return (
		<Fragment>
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