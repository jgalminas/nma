import { ReactNode } from 'react';

export interface HeaderProps {
    children?: ReactNode
}

export default function Header({ children }: HeaderProps) {
    return (
        <div className='bg-gray-100 w-full h-14 col-start-2 flex items-center justify-center'>
            { children }
        </div>
    )
}