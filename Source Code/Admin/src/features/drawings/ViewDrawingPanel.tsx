import { useNavigate, useParams } from 'react-router';
import Panel from '../../components/Panel';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteEventById } from '../events/event.api';
import { Drawing, DropdownOptions } from '../../admin.types';
import Text from '../../components/Text';
import Dropdown from '../../components/Dropdown';
import { ChevronDownIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { getFriendlyDate } from '../../utils/date';
import { Fragment, useState } from 'react';
import DeletePopup from '../../components/DeletePopup';
import { usePage } from '../../contexts/PageContext';
import { deleteDrawingById, fetchDrawingByIdWithScores } from './drawing.api';
import Image from '../../components/Image';
import { Disclosure } from '@headlessui/react';
import PrimaryButtonSmall from '../../components/PrimaryButtonSmall';
import ScoreTable from './ScoreTable';
import { fetchImage } from '../../api/sharedDrawing.api';

export default function ViewDrawingPanel() {

	// navigation props/hoopks
	const { id } = useParams();
	const navigate = useNavigate();	

	// query props/hooks
	const queryClient = useQueryClient();
	const { data: drawing } = useQuery(['drawing', Number(id)], () => fetchDrawingByIdWithScores(Number(id), true));
	const { data: image, isLoading: isImageLoading } = useQuery(['image', Number(id)], () => fetchImage(drawing?.imageUrl ?? ''), { enabled: !!drawing });
	const mutation = useMutation(['deleteDrawing', Number(id)], deleteDrawingById);

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
				{ !drawing?.isScored &&
					<PrimaryButtonSmall
					onClick={() => navigate(`/drawings/score/${drawing?.id}`)}>
					Score
					</PrimaryButtonSmall>
				}
				<Dropdown button={<EllipsisVerticalIcon className='w-6 h-6 text-gray-500'/>} options={options}/>
			</Panel.Header>

			<div className='flex flex-col gap-5'>

				<Image isLoading={isImageLoading} url={image} alt='Drawing'/>
				<Text label="ID"> { drawing?.id ?? '-' } </Text>
				<Text label="Drawer's Name"> { drawing?.drawersName ?? '-' } </Text>
				<Text label="Drawer's Age"> { drawing?.drawersAge ?? '-' } </Text>
				<Text label="Date Added"> { drawing && getFriendlyDate(drawing?.createdAt)  } </Text>
				<Text label="Event"> { drawing?.event.name ?? '-' } </Text>
				<Text label="Scored"> { (drawing?.isScored) ? 'Yes' : 'No' } </Text>
				
				{ drawing?.isScored &&
					<Fragment>
						<h2 className='text-lg font-medium text-gray-700'> Scores </h2>
						<hr/>
					</Fragment>
				}

				{ drawing?.scores.map((score, key) => {
					return (
						<div className='flex flex-col gap-2' key={key}>
							<Disclosure>
								{({ open }) => (
									<Fragment>
										<Disclosure.Button className="flex w-full justify-between items-center px-4 py-2 text-left font-medium text-gray-600
										hover:bg-gray-50 hover:rounded">
											<Text label='Breadth'> { score.breadth } </Text>
											<Text label='Scored At'> { getFriendlyDate(score.scoredAt) } </Text>
											<Text label='By'> { score.scoredBy } </Text>
											<ChevronDownIcon
											className={`${
												open ? 'rotate-180 transform' : ''
											} h-4 w-4 text-gray-500`}
											/>
										</Disclosure.Button>
										<Disclosure.Panel className="text-sm">
											<ScoreTable score={score}/>
										</Disclosure.Panel>
									</Fragment>
								)}
							</Disclosure>
						</div>
					)	
				}) }

			</div>
		</Fragment>
	)
}