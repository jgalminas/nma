export interface PrimaryButtonProps {
	text: string
	onClick: () => void
}

export default function PrimaryButton({ text, onClick }: PrimaryButtonProps) {
	return (
		<button
		className='text-sm font-medium text-white px-6 py-2 rounded bg-blue-600 hover:bg-blue-500 focus:ring ring-blue-300 ring-opacity-40'
		onClick={onClick}>
			{ text }
		</button>
	)
}