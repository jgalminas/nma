import { Fragment } from 'react';

export interface ScoreSelectorProps {
	label?: string,
	value?: number,
	withInput?: boolean,
	onChange: (value: number) => void
}

export default function ScoreSelector({ label, value, withInput, onChange }: ScoreSelectorProps) {

	const scores = [1, 2, 3, 4, 5];

	return (
		<Fragment>
			{ label &&
				<label className='text-gray-600 mb-1 text-sm'>
					{ label }
				</label> }
			<div className='flex gap-2'>
				{ scores.map((score) => {
					return (
						<button className={`w-5 h-5 rounded-md p-4 flex justify-center items-center
						${value === score ? 'bg-blue-500 text-white hover:bg-blue-400' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
						key={score}
						onClick={() => onChange(score)}>
							{ score }
						</button>
					)	
				}) }

				{ withInput &&
					<input value={(value && value !== 0) ? value : ''} type='number' className='focus:outline-none focus:border-blue-400
					focus:ring-2 ring-opacity-40 border border-gray-200 rounded-md bg-gray-100 px-2 text-gray-700 w-14'
					onChange={(e) => onChange(e.target.valueAsNumber)}/>
				}

			</div>
		</Fragment>
	)
}