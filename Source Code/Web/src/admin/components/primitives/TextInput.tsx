import { ChangeEvent, useId } from 'react';
import { Validation } from '../../../types/admin.types';

export interface TextInputProps {
	name?: string,
	onChange: (v: string) => void,
	label?: string,
	value?: string,
	validation?: Validation
}

export default function TextInput({ validation, label, name, value, onChange }: TextInputProps) {
	
	const inputId = name ?? useId();

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);	

	return (
		<div className='flex flex-col'>
			
			{ label &&
				<label htmlFor={inputId} className='text-gray-600 mb-1 text-sm'>
				{ label }
				</label> }

			<input
			className={`bg-gray-50 border border-gray-100 rounded p-1.5 text-gray-700 focus:outline-none focus:border focus:border-blue-400
				focus:ring ring-opacity-40 w-full
				${validation?.isValid ? 'border-gray-100 focus:border-blue-400 ring-blue-300': 'border-red-500 focus:border-red-500 ring-red-300'}`}
			name={name}
			type='text'
			value={value}
			onChange={onInputChange}/>

			{ !validation?.isValid &&
				<p className='ml-auto text-sm text-red-600'> { validation?.message } </p> 
			}

		</div>
	)
}