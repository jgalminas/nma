import { MouseEvent, ReactNode } from 'react';

export interface PrimaryButtonSmallProps {
	children?: ReactNode
	onClick?: () => void
}

export default function PrimaryButtonSmall({ children, onClick }: PrimaryButtonSmallProps) {

	const handleClick = (e: MouseEvent) => {
		e.stopPropagation();
		onClick && onClick()
	}

	return (
		<button className='text-sm text-white px-4 py-1 rounded bg-blue-600 hover:bg-blue-500 focus:ring ring-blue-300 ring-opacity-40
		flex gap-1'
		onClick={handleClick}>
			{ children }
		</button>
	)
}