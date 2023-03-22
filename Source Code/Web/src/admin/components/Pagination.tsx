import usePagination from '../hooks/pagination';
import TextButton from './primitives/TextButton';

export interface PaginationProps {
	current: number,
	count: number,  
	size?: number,
	setPage: (page: number) => void
}

export default function Pagination({ current, setPage, count, size = 10 }: PaginationProps) {

	const range = usePagination(current, count, size);

	const next = () => current < range[range.length - 1] && setPage(current + 1);
	const previous = () => current > range[0] && setPage(current - 1);

	return (
		<div className='flex justify-center gap-8 items-center py-3'>
			<TextButton onClick={previous}> Previous </TextButton>

			<div>
				{ range.map((p, key) => {
					return (
						<button className={`${(p) === '...' ? '': (p) === current ? 'bg-blue-500 text-white': 'bg-gray-200'} py-0.5 px-2.5 text-gray-800 rounded mx-1`}
						key={key}>
							{ p }
						</button>
					)
				}) }
			</div>

			<TextButton onClick={next}> Next </TextButton>
		</div>
	)
}