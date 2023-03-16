export interface TextAreaInputProps {
	name?: string,
	onChange: (v: string) => void
	rows?: number
}

export default function TextAreaInput({ rows, name, onChange }: TextAreaInputProps) {

	const rowCount = rows ?? 3;

	return (
		<textarea
		className='bg-gray-50 border border-gray-100 rounded p-1.5 text-gray-700 focus:outline-none focus:border focus:border-blue-400
			focus:ring-2 ring-blue-300 ring-opacity-40 min-h-[38px] w-full'
		name={name}
		rows={rowCount}
		onChange={(e) => onChange(e.target.value)}/>
	)
}