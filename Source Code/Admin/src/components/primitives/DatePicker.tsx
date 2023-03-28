import { useId } from 'react';
import { Validation } from '../../hooks/validation';

export interface DatePickerProps {
	label?: string
	value?: string,
	onChange: (d: string) => void,
	validation?: Validation
}

export default function DatePicker({ validation, value, onChange, label }: DatePickerProps) {

	const inputId = label ?? useId();

	return (
		<div className='flex flex-col'>

			{ label &&
				<label htmlFor={inputId} className='text-gray-600 mb-1 text-sm'>
				{ label }
				</label> }

			<input
			type="datetime-local"
			value={value}
			className="rounded w-fit bg-transparent text-gray-700 focus:outline-none cursor-pointer"
			onChange={(e) => onChange(e.target.value)}/>

			{ !validation?.isValid &&
				<p className='ml-auto text-sm text-red-600'> { validation?.message } </p> 
			}

		</div> 
	)
}