import { useId } from 'react';

export interface TextAreaInputProps {
	name?: string,
	onChange: (v: string) => void
	rows?: number,
	label?: string,
	value?: string
}

export default function TextAreaInput({ label, rows, name, value, onChange }: TextAreaInputProps) {

	const rowCount = rows ?? 3;
	const inputId = name ?? useId();

	return (
		<div className='flex flex-col'>

			{ label &&
				<label htmlFor={inputId} className='text-gray-600 mb-1 text-sm'>
				{ label }
				</label> }

			<textarea
			className='bg-gray-50 border border-gray-100 rounded p-1.5 text-gray-700 focus:outline-none focus:border focus:border-blue-400
				focus:ring ring-blue-300 ring-opacity-40 min-h-[38px]'
			name={inputId}
			rows={rowCount}
			value={value}
			onChange={(e) => onChange(e.target.value)}/>
			
		</div>
	)
}