import { ReactNode } from 'react';

export interface SidebarProps {
    children?: ReactNode
}

export default function Sidebar({ children }: SidebarProps) {
    return (
        <div className='bg-gray-100 h-full w-14 row-span-full flex flex-col justify-center'>
            { children }
        </div>
    )
}