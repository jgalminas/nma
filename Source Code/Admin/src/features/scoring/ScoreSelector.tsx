import { Fragment } from 'react';

export interface ScoreSelectorProps {
	label?: string,
	value?: number,
	onChange: (value: number) => void 
}

export default function ScoreSelector({ label, value, onChange }: ScoreSelectorProps) {



	return (
		<Fragment>
			{ label &&
				<label className='text-gray-500'>
					{ label }
				</label> }
			<div>

			</div>
		</Fragment>
	)
}