export interface HeadingProps {
	children?: string
}

export default function Heading({ children }: HeadingProps) {
	return (
		<h1 className='text-gray-800 text-3xl font-medium'> { children } </h1>
	)
}