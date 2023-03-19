import { ReactNode } from 'react';
import { PANEL_PARENT_ID } from './constants';

export interface PageProps {
	children: ReactNode
}

export default function Page({ children }: PageProps) {
	return (
		<div className='bg-gray-50 w-full py-7 px-10 overflow-auto flex justify-center'>
			{ children }
		</div>
	)
}