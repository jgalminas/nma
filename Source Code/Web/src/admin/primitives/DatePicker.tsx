import { useId } from 'react';

export interface DatePickerProps {
	label?: string
	value?: string,
	onChange: (d: string | null) => void
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
			value={value}
			className="rounded w-fit bg-transparent text-gray-700 focus:outline-none"
			onChange={(e) => onChange(e.target.value)}/>

		</div> 
	)
}