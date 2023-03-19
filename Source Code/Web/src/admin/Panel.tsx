import { createPortal } from 'react-dom';
import { ReactNode, useEffect, useState } from 'react';
import { PANEL_PARENT_ID } from './constants';

export interface PanelProps {
	children: ReactNode
}

export default function Panel({ children }: PanelProps) {

	const [isDOMLoaded, setDOMLoaded] = useState<boolean>(false);

	useEffect(() => {
		setDOMLoaded(true);
	}, [])

	const parent = document.getElementById(PANEL_PARENT_ID) as HTMLElement;

	return (
		isDOMLoaded ? createPortal(
			<div className='p-5 w-[25rem] xl:w-[28rem] h-[calc(100vh-3.75rem)] border-l border-gray-200 bg-white absolute top-[3.75rem] right-0 flex flex-col overflow-x-auto'>

				{ children }
				
			</div>,
			parent
		)
		: null
	)
}