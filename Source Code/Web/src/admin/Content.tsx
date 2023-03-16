import { Children } from '../types/global.types';
import TextAreaInput from './primitives/TextAreaInput';

export interface ContentProps {
	children: Children
}

export default function Content({ children }: ContentProps) {
	return (
		<div id='content' className='bg-gray-50 w-full p-5 relative overflow-auto'>

			{ children }
			
			<TextAreaInput onChange={(e) => console.log(e)}/>

		</div>
	)
}