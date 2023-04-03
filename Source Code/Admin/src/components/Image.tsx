export interface ImageProps {
	isLoading: boolean,
	url: Blob | undefined,
	alt?: string
}

export default function Image({ isLoading, url, alt }: ImageProps) {
	return (
		<div className={`w-full aspect-video rounded ${isLoading ? 'animate-pulse bg-gray-200' : 'bg-gray-50'}`}>
			{ !isLoading && <img className='rounded w-full aspect-video object-contain'src={ url && URL.createObjectURL(url)} alt={alt}/> }
		</div>
	)
}