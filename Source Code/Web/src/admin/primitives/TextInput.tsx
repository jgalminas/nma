export interface TextInputProps {
	name?: string,
	onChange: (v: string) => void
}

export default function TextInput({ name, onChange }: TextInputProps) {
	return (
		<input
		className='bg-gray-50 border border-gray-100 rounded p-1.5 text-gray-700 focus:outline-none focus:border focus:border-blue-400
			focus:ring-2 ring-blue-300 ring-opacity-40 w-full'
		name={name}
		type='text'
		onChange={(e) => onChange(e.target.value)}/>
	)
}