import { createPortal } from 'react-dom';
import { ReactNode, useEffect, useState } from 'react';
import { PAGE_ID } from './constants';

export interface PanelProps {
	children: ReactNode
}

export default function Panel({ children }: PanelProps) {

	const [isDOMLoaded, setDOMLoaded] = useState<boolean>(false);

	useEffect(() => {
		setDOMLoaded(true);
	}, [])

	const parent = document.getElementById(PAGE_ID) as HTMLElement;

	return (
		isDOMLoaded ? createPortal(
			<div className='w-[25rem] xl:w-[28rem] h-full border-l border-gray-200 bg-white absolute top-0 right-0'>

				{ children }
				
			</div>,
			parent
		)
		: null
	)
}