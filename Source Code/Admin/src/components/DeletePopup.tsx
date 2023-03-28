import { TrashIcon } from '@heroicons/react/24/outline';
import Spinner from './icons/Spinner';
import Popup from './Popup';
import DangerButton from './primitives/DangerButton';
import TextButton from './primitives/TextButton';

export interface DeletePopupProps {
	onClose?: () => void,
	onConfirm?: () => void,
	isLoading: boolean,
	isError: boolean
}

export default function DeletePopup({ onClose, onConfirm, isLoading, isError }: DeletePopupProps) {

	return (
		<Popup onClose={onClose}>
			<div className='w-80'>
				<h1 className='text-xl font-medium text-gray-700'> Confirm Delete </h1>
				<p className='text-gray-600 mt-2'> Are you sure you want to delete this item? </p>

				{ isError ?
					<p className='text-red-600 mt-5'> A server error occurred, the item could not be deleted. </p>
					: null
				}

				<div className='flex gap-4 justify-end mt-7'>
					<TextButton onClick={onClose}> Cancel </TextButton>
					<DangerButton disabled={isLoading} onClick={onConfirm}>
						{ isLoading ?
							<Spinner/>
							: <TrashIcon className='w-5 h-5 stroke-2'/>
						}
						Delete
					</DangerButton>
				</div>
			</div>
		</Popup>
	)
}