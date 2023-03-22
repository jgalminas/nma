import { useMemo } from 'react';
import { range } from '../utils/number';

export default function usePagination(current: number, count: number, size: number) {

	const pageRange = useMemo(() => {

		const PAGE_COUNT = Math.ceil(count / size);
		const MAX_PAGE_NUM = 6;
	
		if (MAX_PAGE_NUM >= PAGE_COUNT) {
			return range(1, PAGE_COUNT);
		}
	
		const leftSiblingIndex = Math.max(current - 1, 1);
		const rightSiblingIndex = Math.min(current + 1, PAGE_COUNT);
	
		const showLeftDots = leftSiblingIndex > 2;
		const showRightDots = rightSiblingIndex < PAGE_COUNT - 2;
	
		if (!showLeftDots && showRightDots) {
	
			var leftItemCount = 3 + 2;
			var leftRange = range(1, leftItemCount);
	  
			return [...leftRange, '...', PAGE_COUNT];
		  }
	
		if (showLeftDots && !showRightDots) {
		
			var rightItemCount = 3 + 2;
			var rightRange = range(PAGE_COUNT - rightItemCount + 1, PAGE_COUNT);
	
			return [1, '...', ...rightRange];
		}
	
		if (showLeftDots && showRightDots) {
			var middleRange = range(leftSiblingIndex, rightSiblingIndex);
			return [1, '...', ...middleRange, '...', PAGE_COUNT];
		}

		return [];

	}, [count, size, current])

	return pageRange;
}