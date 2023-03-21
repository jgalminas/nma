import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { SelectOption } from '../../../types/admin.types';

export interface SelectProps {
	options: SelectOption[],
	value: SelectOption,
	onChange: (selected: SelectOption) => void
}

export default function Select({ value, onChange, options }: SelectProps) {

	return (
		<Listbox as='div' value={value} onChange={onChange} className='relative'>
			
			<Listbox.Button className='flex items-center text-gray-600 gap-8'>
				{ value.value }
				<ChevronDownIcon className="h-4 w-4 stroke-2 pointer-events-none" aria-hidden="true"/>
			</Listbox.Button>

			<Transition
			as={Fragment}
			leave="transition ease-in duration-100"
			leaveFrom="opacity-100"
			leaveTo="opacity-0">
				<Listbox.Options className="absolute mt-1 max-h-60 overflow-auto border border-1 border-gray-200 rounded bg-white w-fit min-w-[10rem]">
				{ options.map((opt, key) => (
					<Listbox.Option key={key}
					className={({ active }) => `relative text-left cursor-default select-none py-1.5 px-3 text-gray-600 ${active && 'bg-gray-50'}`}
					value={ opt }>
						{ opt.value }
					</Listbox.Option>
				))}
				</Listbox.Options>
				</Transition>

		</Listbox>
	)
}