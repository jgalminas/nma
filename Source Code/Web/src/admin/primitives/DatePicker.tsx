import { useId } from 'react';

export interface DatePickerProps {
	label?: string
	value: Date,
	onChange: (d: Date | null) => void
}

export default function DatePicker({ value, onChange, label }: DatePickerProps) {

	const inputId = label ?? useId();

	return (
		<div className='flex flex-col'>

			{ label &&
				<label htmlFor={inputId} className='text-gray-600 mb-1'>
				{ label }
				</label> }

			<input
			type="date"
			className="rounded w-fit bg-transparent text-gray-700 focus:outline-none font-medium"
			onChange={(e) => onChange(e.target.valueAsDate)}/>

		</div> 
	)
}