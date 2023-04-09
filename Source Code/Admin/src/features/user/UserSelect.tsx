import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import TextButton from '../../components/TextButton';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router';

export default function UserSelect() {

	const { setUser } = useUser();
	const navigate = useNavigate();

	const users = [
		{ id: 1, username: 'User 1' },
		{ id: 2, username: 'User 2' },
		{ id: 1, username: 'User 1' },
		{ id: 2, username: 'User 2' },
		{ id: 1, username: 'User 1' },
		{ id: 2, username: 'User 2' },
		{ id: 2, username: 'User 2' },
		{ id: 2, username: 'User 2' },
	]	

	return (
		<div className='h-screen w-full flex justify-center items-center bg-gray-100'>
			
			<div className='text-center flex flex-col pt-6 pb-3 bg-white rounded-md border border-gray-200 w-96 h-96'>
			<h1 className='text-gray-700 text-xl font-medium'> Select User </h1> 

			<div className='mt-6 flex flex-col overflow-x-auto border-t border-b py-2 border-gray-100'>
				{ users.map((u, key) => {
					return (
						<div key={key} className='py-2.5 px-4 text-gray-600 hover:bg-gray-50 rounded flex justify-center relative cursor-pointer'
						onClick={() => setUser({ id: u.id, username: u.username })}>
							<p className=''> { u.username } </p>
							<button className='absolute top-2 right-2 p-1 hover:bg-gray-200 rounded'
							onClick={(e) => { e.stopPropagation(); navigate(`edit${u.id}`); }}>
								<EllipsisVerticalIcon className='w-5 h-5'/>
							</button>
						</div>
					)
				}) }
			</div>
			
			<div className='pt-3 justify-end px-3 mt-auto'>
				<TextButton onClick={() => navigate('create')}> Add User </TextButton>
			</div>

			</div>
  
		</div>
	)
}