export interface PageHeadingProps {
	children?: string
}

export default function PageHeading({ children }: PageHeadingProps) {
	return (
		<h1 className='text-gray-800 text-3xl font-medium'> { children } </h1>
	)
}