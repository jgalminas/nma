import { useNavigate, useParams } from 'react-router';
import PrimaryButton from '../../components/PrimaryButton';
import TextButton from '../../components/TextButton';
import TextInput from '../../components/TextInput';
import { Fragment, useEffect, useState } from 'react';
import { useValidation } from '../../hooks/validation';
import { validateLength } from '../../utils/validation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createScorer, deleteScorerById, fetchScorer, updateScorer } from './user.api';
import { CreateEditScorer } from '../../admin.types';
import DeletePopup from '../../components/DeletePopup';
import DangerButton from '../../components/DangerButton';

export default function CreateEditUser() {

	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { id } = useParams();

	// state
	const [popup, setPopup] = useState(false); 
	const [error, setError] = useState<boolean>(false);
	const [username, setUsername] = useState<string>('');
	const { validation } = useValidation({ "validation": { message: 'Username cannot be empty', isValid: true, validator: validateLength } });

	// network
	const mutation = useMutation(id
		? (scorer: CreateEditScorer) => updateScorer(Number(id), scorer)
		: (scorer: CreateEditScorer) => createScorer(scorer));

	const deleteMutation = useMutation(['deleteUser', Number(id)], deleteScorerById);


	// fetch scorer data when editing
	useEffect(() => {

		if (id) {
			queryClient.fetchQuery(["scorer", Number(id)], () => fetchScorer(Number(id)))
			.then((scorer) => setUsername(scorer.username));		
		}

	}, [id])

	const onUsernameChange = (value: string) => {
		validation.validate(value);
		setUsername(value);
	};

	const navigateBack = () => navigate(-1);
	const deleteUser = () => setPopup(true);
	const cancelDelete = () => setPopup(false);

	const confirmDelete = () => {
		deleteMutation.mutate(Number(id),
		{
			onSuccess: (res) => {
				if (res.ok) {
					navigateBack();
				}
			}
		});
	}

	const onSumbit = () => {

		setError(false);

		if (validation.validate(username)) {

			mutation.mutate({ username: username }, {
				onSuccess: () => {
					navigateBack();
				},
				onError: () => {
					setError(true);				
				}
			});

		}

	}

	return (
		<div className='flex flex-col p-6 bg-white rounded-md border border-gray-200 w-96 h-96 shadow-xl'>

			{ popup &&
				<DeletePopup
				onClose={cancelDelete}
				onConfirm={confirmDelete}
				isError={deleteMutation.data?.status === 500}
				isLoading={deleteMutation.isLoading}/>
			}

			<h1 className='text-gray-700 text-lg font-medium'> { id ? 'Edit User' : 'Add User' } </h1> 
			
			<div className='mt-6 flex flex-col border-t border-gray-100'>
				<div className='mt-3'>
					{ id && <h2 className='text-gray-600 text-base font-medium mb-3'> Change Username </h2> }
					<TextInput value={username} label='Username' onChange={onUsernameChange} validation={validation.validation}/>
				</div>
				
				{ id &&
					<Fragment>
						<h2 className='text-gray-600 text-base font-medium mt-5 mb-3'> Delete User </h2>
						<div>
							<DangerButton onClick={deleteUser}> Delete </DangerButton>
						</div>
					</Fragment>
				}

			</div>

			<div className='mt-auto'>
			
				{ error && 
					<p className='w-full mt-auto text-right text-red-600 mb-3'>
						{ `Server error. Could not ${id ? 'edit' : 'create'} user.` }
					</p>
				}

				<div className='flex justify-end mt-auto gap-3'>
					<TextButton onClick={navigateBack}> Back </TextButton>
					<PrimaryButton onClick={onSumbit}> { id ? 'Edit' : 'Add' } </PrimaryButton>
				</div>

			</div>

		</div>
	)
}