import { ReactNode } from 'react';

export interface TableProps {
	children: ReactNode,
	className?: string,
	overrideClass?: boolean
}

// HTML <table/> component
export default function Table({ children, className, overrideClass = false }: TableProps) {

	const defaultClass = 'w-full text-gray-600 divide-y divide-gray-200 outline outline-1 outline-gray-200 rounded-md';
	const tableClass = !overrideClass ? `${className} ${defaultClass}` : className;

	return (
		<table className={tableClass}>
			{ children }
		</table>
	)
}


// HTML <thead/> component
export interface HeadProps {
	children: ReactNode,
	className?: string,
	overrideClass?: boolean
}

export function Head({ children, className, overrideClass }: HeadProps) {

	const defaultClass = 'bg-gray-50';
	const headClass = !overrideClass ? `${className} ${defaultClass}` : className;

	return (
		<thead className={headClass}>
			{ children }
		</thead>
	)
}

// HTML <th/> component
export interface HeadingProps {
	children?: ReactNode
}

export function Heading({ children }: HeadingProps) {
	return (
		<th className='text-left p-2 font-medium px-4'>
			{ children }
		</th>
	)
}

// HTML <tr/> component
export interface RowProps {
	onClick?: () => void,
	className?: string,
	children: ReactNode
}

export function Row({ onClick, className, children }: RowProps) {
	return (
		<tr className={className} onClick={onClick && onClick}>
			{ children }
		</tr>
	)
}

// HTML <tbody/> component
export interface BodyProps {
	children: ReactNode
}

export function Body({ children }: BodyProps) {
	return (
		<tbody className='divide-y bg-white'>
			{ children }
		</tbody>
	)
}

// HTML <td/> component
export interface DataProps {
	children: ReactNode
}

export function Data({ children }: DataProps) {
	return (
		<td data-ignored className='py-2 px-4'>
			{ children }
		</td>
	)
}

Table.Head = Head;
Table.Row = Row;
Table.Body = Body;
Table.Heading = Heading;
Table.Data = Data;