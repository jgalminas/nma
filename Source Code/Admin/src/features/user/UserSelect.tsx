import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchScorers } from './user.api';
import PrimaryButton from '../../components/PrimaryButton';

export default function UserSelect() {

	const { setUser } = useUser();
	const navigate = useNavigate();

	const { data: users } = useQuery(['users'], {
		queryFn: fetchScorers,
		select: (data) => data.map(s => ({ id: s.scorerId, username: s.username }))
	});

	return (
		<div className='flex flex-col bg-white rounded-md border border-gray-200 w-96 h-96 shadow-xl'>

			<div className='p-6 flex flex-col border-b'>
				<h1 className='text-gray-700 text-lg font-medium'> Select User </h1>
				<p className='text-gray-600'> Please select a user to continue. </p>
			</div>

			{ (users && users.length > 0) ?
				<div className='flex flex-col overflow-x-auto py-2 border-gray-100'>
					{ users.map((u, key) => {
						return (
							<div key={key} className='py-2.5 px-4 text-gray-600 hover:bg-gray-50 rounded flex justify-center relative cursor-pointer'
							onClick={() => setUser({ id: u.id, username: u.username })}>
								<p className=''> { u.username } </p>
								<button className='absolute top-2 right-2 p-1 hover:bg-gray-200 rounded'
								onClick={(e) => { e.stopPropagation(); navigate(`/users/edit/${u.id}`); }}>
									<EllipsisVerticalIcon className='w-5 h-5'/>
								</button>
							</div>
						)
					}) }
				</div>
				: <div className='flex justify-center items-center flex-grow'>
					<p className='text-center text-gray-500'> No users found. <br/> Add one to continue. </p>
				</div>
			} 

			<div className='mt-auto flex justify-end p-6 border-t'>
				<PrimaryButton onClick={() => navigate('/users/create')}> Add User </PrimaryButton>
			</div>

		</div>
	)
}