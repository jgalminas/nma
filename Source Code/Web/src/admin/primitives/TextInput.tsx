import { useId } from 'react';

export interface TextInputProps {
	name?: string,
	onChange: (v: string) => void,
	label?: string
}

export default function TextInput({ label, name, onChange }: TextInputProps) {
	
	const inputId = name ?? useId();
	
	return (
		<div>

			{ label &&
				<label htmlFor={inputId} className='text-gray-600 mb-1'>
				{ label }
				</label> }

			<input
			className='bg-gray-50 border border-gray-100 rounded p-1.5 text-gray-700 focus:outline-none focus:border focus:border-blue-400
				focus:ring ring-blue-300 ring-opacity-40 w-full'
			name={name}
			type='text'
			onChange={(e) => onChange(e.target.value)}/>

		</div>
	)
}