import { ReactNode, useEffect, useState} from 'react';
import { createPortal } from 'react-dom';
import { PANEL_PARENT_ID } from '../constants';

export interface PopupProps {
	children?: ReactNode,
	onClose?: () => void
}

export default function Popup({ children, onClose }: PopupProps) {

	const [isDOMLoaded, setDOMLoaded] = useState<boolean>(false);
	
	useEffect(() => {
		setDOMLoaded(true);
	}, [])

	return (
		isDOMLoaded ? createPortal(
			(	
				<div onClick={onClose} className='absolute flex w-full h-full justify-center items-center bg-black bg-opacity-10' data-ignored>
					<div onClick={(e) => e.stopPropagation()} className='bg-white border-gray-400 rounded-md shadow-2xl p-6'>
						{ children }
					</div>
				</div>
			),
			document.getElementById(PANEL_PARENT_ID) as HTMLElement
		): null
	)
}