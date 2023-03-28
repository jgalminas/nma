import { QueryClient, QueryKey } from '@tanstack/react-query';

export interface QueryItemData {
	queryKey: QueryKey | null,
	itemIndex: number | null
}

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