export interface H2HeadingProps {
	children: string
}

export default function H2Heading({ children }: H2HeadingProps) {
	return (
		<h2 className='text-xl text-gray-600 font-medium'>
			{ children }
		</h2>
	)
}