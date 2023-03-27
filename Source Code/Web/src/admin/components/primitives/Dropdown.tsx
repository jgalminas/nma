import { Menu, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { DropdownOptions } from '../../../types/admin.types';

export interface DropdownProps {
	button: ReactNode
	options: DropdownOptions[]
}

export default function Dropdown({ button, options }: DropdownProps) {
	return (
		<Menu as='div' className='relative inline-block'>
			<Menu.Button className='hover:bg-gray-50 p-1 rounded-sm'> { button } </Menu.Button>
			<Transition
			as={Fragment}
			enter="transition ease-out duration-100"
			enterFrom="transform opacity-0 scale-95"
			enterTo="transform opacity-100 scale-100"
			leave="transition ease-in duration-75"
			leaveFrom="transform opacity-100 scale-100"
			leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className='flex flex-col text-gray-500 rounded right-0 border absolute bg-white border-gray-200 w-fit min-w-[10rem]'>
					{ options.map((opt, key) => {
						return (
							<Menu.Item key={key}>
								{({ active }) => (
									<button className={`${active && 'bg-gray-50'} text-left px-3 py-1`} onClick={opt.onClick}>
										{ opt.name }
									</button>
								)}
							</Menu.Item>
						)
					}) }
				</Menu.Items>
			</Transition>
		</Menu>
	)
}