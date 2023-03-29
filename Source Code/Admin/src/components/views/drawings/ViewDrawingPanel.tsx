import { useNavigate, useParams } from 'react-router';
import Panel from '../../Panel';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteEventById } from '../../../api/event';
import { Drawing, DropdownOptions } from '../../../admin.types';
import Text from '../../primitives/Text';
import Dropdown from '../../primitives/Dropdown';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { getFriendlyDate } from '../../../utils/date';
import { Fragment, useState } from 'react';
import DeletePopup from '../../DeletePopup';
import { usePage } from '../../../contexts/PageContext';
import { fetchDrawingByIdWithScores, fetchImage } from '../../../api/drawing';
import Image from '../../Image';

export default function ViewDrawingPanel() {

	// navigation props/hoopks
	const { id } = useParams();
	const navigate = useNavigate();	

	// query props/hooks
	const queryClient = useQueryClient();
	const { data: drawing } = useQuery(['drawing', Number(id)], () => fetchDrawingByIdWithScores(Number(id), true));
	const { data: image, isLoading: isImageLoading } = useQuery(['image', Number(id)], () => fetchImage(drawing?.imageUrl ?? ''), { enabled: !!drawing });
	const mutation = useMutation(['deleteDrawing', Number(id)], deleteEventById);

	// state
	const [popup, setPopup] = useState(false);
	const { page, setPage } = usePage();
	
	// dropdown menu options 
	const options: DropdownOptions[] = [
		{ name: 'Edit', onClick: () => navigateToEdit() },
		{ name: 'Delete', onClick: () => deleteDrawing() }
	];

	// navigation functions
	const navigateToEdit = () => navigate(`edit`);
	const navigateBack = () => navigate(-1);

	// delete functions
	const deleteDrawing = () => { 
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
					
					queryClient.setQueryData<Drawing[]>(['drawings', page], (prev) => {

						if (prev) {
							
							const itemIndex = prev.findIndex(i => i.id === Number(id));						

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

					queryClient.invalidateQueries(['drawingCount']);

					// navigate back
					navigateBack();
				}

			}
		});

	}

	return (
		<Fragment>

			{ popup && <DeletePopup onClose={cancelDelete} onConfirm={confirmDelete} isError={mutation.data?.status === 500} isLoading={mutation.isLoading}/> }

			<Panel.Header title='Drawing Details'>
				<Dropdown button={<EllipsisVerticalIcon className='w-6 h-6 text-gray-500'/>} options={options}/>
			</Panel.Header>

			<div className='flex flex-col gap-5'>

				<Image isLoading={isImageLoading} url={image} alt='Drawing'/>
				<Text label="ID"> { drawing?.id ?? '-' } </Text>
				<Text label="Drawer's Name"> { drawing?.drawersName ?? '-' } </Text>
				<Text label="Drawer's Age"> { drawing?.drawersAge ?? '-' } </Text>
				<Text label="Date Added"> { drawing && getFriendlyDate(drawing?.createdAt)  } </Text>
			</div>
		</Fragment>
	)
}