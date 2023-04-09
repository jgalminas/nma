import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useUser } from '../contexts/UserContext';

export default function Header() {

	const { user, signOut } = useUser();

	return (
		<div className='bg-white border-b border-gray-200 flex items-center justify-end pr-2 gap-2'>
			<p className='h-fit text-lg text-gray-600'> { user?.username } </p>
			<button className='h-fit text-gray-600 p-2 rounded-md hover:bg-gray-50' onClick={signOut}> <ArrowRightOnRectangleIcon className='w-5 h-5'/> </button>
		</div>
	)
}