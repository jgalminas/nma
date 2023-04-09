import { useUser } from '../../../contexts/UserContext';

export interface UserSelectProps {
	
}

export default function UserSelect({  }: UserSelectProps) {

	const { user, setUser } = useUser();

	console.log(user);
	

	return (
		<div>
			select user

			<button className='bg-green-600' onClick={() => setUser({ id: 1, username: 'Hello' })}> Select </button>
		</div>
	)
}