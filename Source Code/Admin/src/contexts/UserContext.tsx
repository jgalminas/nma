import { createContext, ReactNode, useContext, useState } from 'react';

export type User = {
	id: number,
	username: string
}

export interface UserContextProps {
	setUser: (user: User) => void,
	user: User | null,
	signOut: () => void
}

const UserContext = createContext<UserContextProps>({
	setUser: () => {},
	user: null,
	signOut: () => {}
});

export const useUser = () => useContext(UserContext);

export interface UserProviderProps {
	children?: ReactNode
}

export function UserProvider({ children }: UserProviderProps) {

	const [user, setUser] = useState<User | null>(null);

	const value: UserContextProps = {
		setUser,
		user,
		signOut: () => setUser(null)
	}

	return (
		<UserContext.Provider value={value}>
			{ children }
		</UserContext.Provider>
	)
}
