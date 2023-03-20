import { createPortal } from 'react-dom';
import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import { PANEL_PARENT_ID } from './constants';
import useClickOutside from './hooks/clickOutside';
import { DropdownOptions } from '../types/admin.types';
import Dropdown from './primitives/Dropdown';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

export interface PanelProps {
	children: ReactNode,
	onClose: () => void
}

export default function Panel({ children, onClose }: PanelProps) {

	const [isDOMLoaded, setDOMLoaded] = useState<boolean>(false);

	const ref = useRef<HTMLDivElement>(null);
	useClickOutside(ref, onClose);

	useEffect(() => {
		setDOMLoaded(true);
	}, [])

	const parent = document.getElementById(PANEL_PARENT_ID) as HTMLElement;

	return (
		isDOMLoaded ? createPortal(
			<div ref={ref} className='p-5 w-[25rem] xl:w-[28rem] h-[calc(100vh-3.75rem)] border-l border-gray-200 bg-white absolute top-[3.75rem] right-0 flex flex-col overflow-x-auto'>

				{ children }
				
			</div>,
			parent
		)
		: null
	)
}

interface HeaderProps {
	children: string,
	options: DropdownOptions[]
}

function Header({ children, options }: HeaderProps) {
	return (
		<Fragment>
			<div className='flex items-center'>
				<h2 className='text-xl font-medium text-gray-700 mr-auto'> { children } </h2>
				<Dropdown button={<EllipsisVerticalIcon className='w-6 h-6 text-gray-500'/>} options={options}/>
			</div>

			<hr className='my-5'/>
		</Fragment>
	)
}

Panel.Header = Header;