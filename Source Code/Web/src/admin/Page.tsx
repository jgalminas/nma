import { ReactNode } from 'react';
import { PAGE_ID } from './constants';

export interface PageProps {
	children: ReactNode
}

export default function Page({ children }: PageProps) {
	return (
		<div id={PAGE_ID} className='bg-gray-50 w-full py-7 px-10 relative overflow-x-auto flex justify-center'>
			{ children }
		</div>
	)
}