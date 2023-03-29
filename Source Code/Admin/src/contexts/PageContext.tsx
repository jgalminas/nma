import { createContext, ReactNode, useContext, useState } from 'react';

export interface PageContextProps {
	setPage: (page: number) => void,
	page: number
}

const PageContext = createContext<PageContextProps>({
	setPage: () => {},
	page: 0,
});

export const usePage = () => useContext(PageContext);

export interface PageProviderProps {
	children?: ReactNode
}

export function PageProvider({ children }: PageProviderProps) {

	const [page, setPage] = useState<number>(0);
	
	const value: PageContextProps = {
		setPage,
		page,
	}

	return (
		<PageContext.Provider value={value}>
			{ children }
		</PageContext.Provider>
	)
}
