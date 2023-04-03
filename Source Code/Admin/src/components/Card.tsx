import { ReactNode } from 'react';

export interface CardProps {
	children: ReactNode,
	className?: string,
	overrideClass?: boolean // option to append or override the className
}

export default function Card({ children, className, overrideClass: overrideClass = false }: CardProps) {

	const defaultClass = 'border border-gray-200 p-5 bg-white rounded-md w-fit h-fit';
	const cardClass = !overrideClass ? `${className} ${defaultClass}` : className;

	return (
		<div className={cardClass}>
			{ children }
		</div>
	)
}

function Divider() {
	return (
		<hr className='border-gray-200 my-5'/>
	)
}

interface ActionsProps {
	children?: ReactNode
}

function Actions({ children }: ActionsProps) {
	return (
		<div className='flex justify-end gap-3'>
			{ children }
		</div>
	)
}

Card.Divider = Divider;
Card.Actions = Actions;