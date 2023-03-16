import { useId } from 'react';

export interface TextAreaInputProps {
	name?: string,
	onChange: (v: string) => void
	rows?: number,
	label?: string
}

export default function TextAreaInput({ label, rows, name, onChange }: TextAreaInputProps) {

	const rowCount = rows ?? 3;
	const inputId = name ?? useId();

	return (
		<div className='flex flex-col'>

			{ label &&
				<label htmlFor={inputId} className='text-gray-600 mb-1'>
				{ label }
				</label> }

			<textarea
			className='bg-gray-50 border border-gray-100 rounded p-1.5 text-gray-700 focus:outline-none focus:border focus:border-blue-400
				focus:ring-2 ring-blue-300 ring-opacity-40 min-h-[38px]'
			name={inputId}
			rows={rowCount}
			onChange={(e) => onChange(e.target.value)}/>
			
		</div>
	)
}