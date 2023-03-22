import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export interface SearchInputProps {
	onChange: (e: string) => void
}

export default function SearchInput({ onChange }: SearchInputProps) {
	return (
		<div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
			<MagnifyingGlassIcon className='w-5 h-5 text-gray-400'/>
        </span>

        <input
		onChange={(e) => onChange(e.target.value)}
		type="text"
		className="w-80 py-1.5 pl-10 pr-2 text-gray-700 bg-white border rounded focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300
			focus:ring-opacity-40"
		placeholder="Search"/>
    	</div>
	)
}