import { Fragment, ReactNode } from 'react';

export interface TextProps {
	children: ReactNode,
	label?: string
}

export default function Text({ label, children }: TextProps) {

	return (
		<Fragment>
			{ label ?
				<label >
					 <span className='text-gray-600 mb-1 text-sm'> { label } </span>
					<p className='text-gray-700'>
						{ children }
					</p>
				</label>
			: 
				<p className='text-gray-700'>
					{ children }
				</p>}
		</Fragment>

	)
}