import { Children } from '../../types/global.types';

export interface TableProps {
	children: Children
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
interface HeadProps {
	children: Children
}

function Head({ children }: HeadProps) {
	return (
		<thead className='bg-gray-100'>
			{ children }
		</thead>
	)
}

// HTML <th/> component
interface HeaderProps {
	children: Children
}

function Header({ children }: HeaderProps) {
	return (
		<th className='text-left p-2 font-medium'>
			{ children }
		</th>
	)
}

// HTML <tr/> component
interface RowProps {
	children: Children
}

function Row({ children }: RowProps) {
	return (
		<tr>
			{ children }
		</tr>
	)
}

// HTML <tbody/> component
interface BodyProps {
	children: Children
}

function Body({ children }: BodyProps) {
	return (
		<tbody className='divide-y'>
			{ children }
		</tbody>
	)
}

// HTML <td/> component
interface DataProps {
	children: Children
}

function Data({ children }: DataProps) {
	return (
		<td className='p-2'>
			{ children }
		</td>
	)
}

Table.Head = Head;
Table.Row = Row;
Table.Body = Body;
Table.Header = Header;
Table.Data = Data;