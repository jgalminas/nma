import { ChangeEvent, useId } from 'react';
import { Validation } from '../hooks/validation';

export interface TextInputProps {
	name?: string,
	onChange: (v: string) => void,
	label?: string,
	value?: string,
	validation?: Validation,
	type?: "number" | "text",
	max?: number
}

export default function TextInput({ validation, label, name, value, onChange, type = "text", max }: TextInputProps) {
	
	const inputId = name ?? useId();

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (type === "number") {
			if (/^[0-9]*$/.test(e.target.value)) {
				onChange(e.target.value);
			}	
		} else {
			onChange(e.target.value);
		}

	};	

	return (
		<div className='flex flex-col'>
			
			{ label &&
				<label htmlFor={inputId} className='text-gray-600 mb-1 text-sm'>
				{ label }
				</label> }

			<input
			className={`bg-gray-100 border border-gray-200 rounded p-1.5 text-gray-700 focus:outline-none focus:border focus:border-blue-400
				focus:ring ring-opacity-40 w-full
				${validation?.isValid ? 'border-gray-100 focus:border-blue-400 ring-blue-300': 'border-red-500 focus:border-red-500 ring-red-300'}`}
			name={name}
			type='text'
			maxLength={max}
			value={value}
			onChange={onInputChange}/>

			{ !validation?.isValid &&
				<p className='ml-auto text-sm text-red-600'> { validation?.message } </p> 
			}

		</div>
	)
}