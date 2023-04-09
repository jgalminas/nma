import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Fragment, useId } from 'react';
import { SelectOption } from '../admin.types';
import { Validation } from '../hooks/validation';

export interface SelectProps {
	options: SelectOption[],
	value: SelectOption,
	onChange: (selected: SelectOption) => void,
	label?: string,
	validation?: Validation
}

export default function Select({ label, value, onChange, options, validation }: SelectProps) {

	const inputId = label ?? useId();

	return (
		<div className='flex flex-col'>

			{ label &&
				<label htmlFor={inputId} className='text-gray-600 mb-1 text-sm'>
				{ label }
			</label> }

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
					<Listbox.Options className="absolute mt-1 max-h-60 overflow-y-auto overflow-x-hidden border border-1 border-gray-200 rounded bg-white w-fit min-w-[10rem]">
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

			{ !validation?.isValid &&
				<p className='ml-auto text-sm text-red-600'> { validation?.message } </p> 
			}

		</div>
	)
}