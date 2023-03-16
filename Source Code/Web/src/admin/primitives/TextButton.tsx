export interface TextButtonProps {
	text: string
	onClick: () => void
}

export default function TextButton({ text, onClick }: TextButtonProps) {
	return (
		<button
		className='text-sm font-medium text-gray-600 px-6 py-2 rounded hover:bg-gray-100 focus:ring-2 focus:ring-gray-200'
		onClick={onClick}>
			{ text }
		</button>
	)
}