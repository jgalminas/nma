import { useId } from 'react';

export interface CheckboxProps {
	label?: string,
	onChange?: () => void
}

export default function Checkbox({ label, onChange }: CheckboxProps) {

	const id = useId();

	return (
		<div className='flex gap-2 items-center'>
			<input name={id} type='checkbox' className='w-4 h-4' onChange={onChange}/>
			{ label &&
				<label htmlFor={id} className='text-gray-600'>
					{ label }
				</label> }
		</div>
	)
}