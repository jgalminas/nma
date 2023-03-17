export interface TextButtonProps {
	children?: string
	onClick?: () => void
}

export default function TextButton({ children, onClick }: TextButtonProps) {
	return (
		<button
		className='text-sm font-medium text-gray-600 px-6 py-2 rounded hover:bg-gray-100'
		onClick={onClick}>
			{ children }
		</button>
	)
}