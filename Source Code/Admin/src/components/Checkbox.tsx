import { useId } from 'react';

export interface CheckboxProps {
	label?: string,
	checked?: boolean,
	onChange?: () => void
}

export default function Checkbox({ checked, label, onChange }: CheckboxProps) {

	const id = useId();

	return (
		<div className='flex gap-2 items-center'>
			<input name={id} type='checkbox' checked={checked} className='w-4 h-4' onChange={onChange}/>
			{ label &&
				<label htmlFor={id} className='text-gray-500'>
					{ label }
				</label> }
		</div>
	)
}