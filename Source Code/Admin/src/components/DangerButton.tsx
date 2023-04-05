import { ReactNode } from 'react';

export interface DangerButtonProps {
	children?: ReactNode
	onClick?: () => void,
	disabled?: boolean
}

export default function DangerButton({ children, onClick, disabled }: DangerButtonProps) {
	return (
		<button disabled={disabled}
		className={`text-sm font-medium text-white px-6 py-2 rounded bg-red-600 hover:bg-red-500 focus:ring ring-red-300
		ring-opacity-40 flex gap-1 ${disabled ? 'opacity-70 hover:bg-red-600' : ''}`}
		onClick={onClick}>
			{ children }
		</button>
	)
}