import { ReactNode } from 'react';

export interface CardProps {
	children: ReactNode,
	className?: string,
	appendClassName?: boolean // option to append or override the className
}

export default function Card({ children, className, appendClassName = true }: CardProps) {

	const defaultClass = 'border border-gray-200 p-5 bg-white rounded-md w-fit h-fit';
	const cardClass = appendClassName ? `${className} ${defaultClass}` : className;

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