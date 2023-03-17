import { Children } from '../types/global.types';
import { PAGE_ID } from './constants';

export interface PageProps {
	children: Children
}

export default function Page({ children }: PageProps) {
	return (
		<div id={PAGE_ID} className='bg-gray-50 w-full py-5 px-10 relative overflow-auto flex justify-center'>
			{ children }
		</div>
	)
}