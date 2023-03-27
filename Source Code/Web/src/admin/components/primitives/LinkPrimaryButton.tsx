import { Link } from 'react-router-dom';

export interface LinkPrimaryButtonProps {
	to: string
	children: string
}

export default function LinkPrimaryButton({ to, children }: LinkPrimaryButtonProps) {
	return (
		<Link
		to={to}
		className='text-sm font-medium text-white px-6 py-2 rounded bg-blue-600 hover:bg-blue-500 focus:ring ring-blue-300 ring-opacity-40'>
			{ children }
		</Link>
	)
}