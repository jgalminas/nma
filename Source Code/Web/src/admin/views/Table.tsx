import { ReactNode } from 'react';

export interface TableProps {
	children: ReactNode
}

// HTML <table/> component
export default function Table({ children }: TableProps) {
	return (
		<table className='w-full text-gray-600 divide-y divide-gray-200 outline outline-1 outline-gray-200 rounded-md'>
			{ children }
		</table>
	)
}


// HTML <thead/> component
export interface HeadProps {
	children: ReactNode
}

export function Head({ children }: HeadProps) {
	return (
		<thead className='bg-gray-100'>
			{ children }
		</thead>
	)
}

// HTML <th/> component
export interface HeadingProps {
	children: ReactNode
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
	children: ReactNode
}

export function Row({ children }: RowProps) {
	return (
		<tr>
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
		<tbody className='divide-y'>
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
		<td className='py-2 px-4'>
			{ children }
		</td>
	)
}

Table.Head = Head;
Table.Row = Row;
Table.Body = Body;
Table.Heading = Heading;
Table.Data = Data;