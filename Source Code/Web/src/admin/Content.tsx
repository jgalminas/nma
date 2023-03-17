import { Children } from '../types/global.types';

export interface ContentProps {
	children: Children
}

export default function Content({ children }: ContentProps) {
	return (
		<div className='max-w-[120rem] w-full'>
			{ children }
		</div>
	)
}