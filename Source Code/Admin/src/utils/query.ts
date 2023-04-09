import { QueryClient, QueryKey } from '@tanstack/react-query';

export interface QueryItemData {
	queryKey: QueryKey | null,
	itemIndex: number | null
}

/**
 * Find a specific item in ReactQuery cache given part of query key.
 * @param client ReactQuery client instance
 * @param subkey part of a query key
 * @param find callback function for defining how item will be searched
 * @returns an object containing the full query key and item index inside the cache
 */
export function findItemInCacheArray<T>(client: QueryClient, subkey: string, find: (i: T) => boolean): QueryItemData {

	for (const cache of client.getQueryCache().findAll([subkey])) {

		const data = client.getQueryData(cache.queryKey);
		
		if (data && Array.isArray(data)) {
			const index = data.findIndex(find);

			if (index !== -1) {
				return { queryKey: cache.queryKey, itemIndex: index }
			}
		}


	}

	return { queryKey: null, itemIndex: null }

}