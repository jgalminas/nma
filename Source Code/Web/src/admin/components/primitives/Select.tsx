import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { SelectOption } from '../../../types/admin.types';

export interface SelectProps {
	options: SelectOption[],
	value: string,
	onChange: (option: SelectOption) => void
}

export default function Select({ value, onChange, options }: SelectProps) {
	return (
		<Listbox as='div' value={value} onChange={onChange} className='relative'>
			
			<Listbox.Button className='flex items-center text-gray-600 gap-8'>
				{ value }
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
						className={({ active }) => `relative cursor-default select-none py-1.5 pl-11 pr-8 text-gray-600 ${active && 'bg-gray-50'}`}
						value={ opt }>
					{({ selected }) => (
						<Fragment>
							<span
								className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
								{ opt.value }
							</span>
							{ selected ? (
								<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
								<CheckIcon className="h-5 w-5" aria-hidden="true" />
								</span>
							) : null }
						</Fragment>
					)}
					</Listbox.Option>
				))}
				</Listbox.Options>
				</Transition>

		</Listbox>
	)
}