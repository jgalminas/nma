import { ReactNode } from 'react';

export interface PrimaryButtonProps {
	children?: ReactNode
	onClick?: () => void,
	disabled?: boolean
}

export default function PrimaryButton({ children, onClick, disabled }: PrimaryButtonProps) {
	return (
		<button disabled={disabled}
		className={`text-sm font-medium text-white px-6 py-2 rounded bg-blue-600 hover:bg-blue-500 focus:ring ring-blue-300 ring-opacity-40 flex gap-1
		${disabled ? 'opacity-70 hover:bg-blue-600' : ''}`}
		onClick={onClick}>
			{ children }
		</button>
	)
}