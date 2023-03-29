import { useNavigate, useParams } from 'react-router';
import Panel from '../../Panel';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DropdownOptions, Location } from '../../../admin.types';
import Text from '../../primitives/Text';
import Dropdown from '../../primitives/Dropdown';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import DeletePopup from '../../DeletePopup';
import { deleteLocationById, fetchLocationById } from '../../../api/location';
import { usePage } from '../../../contexts/PageContext';

export default function ViewLocationPanel() {

	// navigation props/hoopks
	const { id } = useParams();
	const navigate = useNavigate();
	const { page, setPage } = usePage();

	// query props/hooks
	const queryClient = useQueryClient();
	const { data: location } = useQuery(['location', Number(id)], () => fetchLocationById(Number(id)));
	const mutation = useMutation(['deleteLocation', Number(id)], deleteLocationById);

	// state
	const [popup, setPopup] = useState(false); 
	
	// dropdown menu options 
	const options: DropdownOptions[] = [
		{ name: 'Edit', onClick: () => navigateToEdit() },
		{ name: 'Delete', onClick: () => deleteLocation() }
	];

	// navigation functions
	const navigateToEdit = () => navigate(`edit`);
	const navigateBack = () => navigate(-1);

	// delete functions
	const deleteLocation = () => { 
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
					
					queryClient.setQueryData<Location[]>(['locations', page], (prev) => {

						if (prev) {
							
							const itemIndex = prev.findIndex(i => i.locationId === Number(id));						

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

					queryClient.invalidateQueries(['locationCount']);

					// navigate back
					navigateBack();
				}

			}
		});

	}

	return (
		<Fragment>

			{ popup && <DeletePopup onClose={cancelDelete} onConfirm={confirmDelete} isError={mutation.data?.status === 500} isLoading={mutation.isLoading}/> }

			<Panel.Header title='Location Details'>
				<Dropdown button={<EllipsisVerticalIcon className='w-6 h-6 text-gray-500'/>} options={options}/>
			</Panel.Header>

			<div className='flex flex-col gap-5'>
				<Text label='ID'> { location?.locationId ?? '-' } </Text>
				<Text label='Name'> { location?.locationName ?? '-' } </Text>
				<Text label='Name'> { location?.city ?? '-' } </Text>
				<Text label='Name'> { location?.country ?? '-' } </Text>
			</div>

		</Fragment>
	)
}