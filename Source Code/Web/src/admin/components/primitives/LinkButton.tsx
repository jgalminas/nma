import { Link } from 'react-router-dom';

export interface LinkButtonProps {
	to: string
	children: string
}

export default function LinkButton({ to, children }: LinkButtonProps) {
	return (
		<Link
		to={to}
		className='text-sm font-medium text-gray-600 px-6 py-2 rounded hover:bg-gray-100'>
			{ children }
		</Link>
	)
}