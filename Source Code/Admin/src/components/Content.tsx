import { ReactNode } from 'react';

export interface ContentProps {
	children: ReactNode
}

export default function Content({ children }: ContentProps) {
	return (
		<div className='max-w-[120rem] w-full h-full flex flex-col'>
			{ children }
		</div>
	)
}