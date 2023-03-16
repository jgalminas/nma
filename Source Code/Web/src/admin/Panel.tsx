import { Children } from '../types/global.types';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

export interface PanelProps {
	children: Children
}

export default function Panel({ children }: PanelProps) {

	const [isDOMLoaded, setDOMLoaded] = useState<boolean>(false);

	useEffect(() => {
		setDOMLoaded(true);
	}, [])

	const parent = document.getElementById('content') as HTMLElement;

	return (
		isDOMLoaded ? createPortal(
			<div className='w-[400px] xl:w-[450px] h-full border-l border-gray-200 bg-white absolute top-0 right-0'>

				

				{ children }
			</div>,
			parent
		)
		: null
	)
}