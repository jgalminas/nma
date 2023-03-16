import { Children } from '../types/global.types';

export interface ContentProps {
	children: Children
}

export default function Content({ children }: ContentProps) {
	return (
		<div id='content' className='bg-gray-50 w-full p-5 relative overflow-auto'>

			{ children }

		</div>
	)
}