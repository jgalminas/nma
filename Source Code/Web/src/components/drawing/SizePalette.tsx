import { useState } from 'react';

export interface SizePaletteProps {
    sizes: number[],
    setSize: (size: number) => void
}

export default function SizePalette({ sizes, setSize }: SizePaletteProps) {

    const [selected, setSelected] = useState<number>(0);

    return (
        <div className='flex flex-col gap-3 items-center'>
            { sizes.map((size, index) => {
                return (
                <button className={`w-9 h-9 flex justify-center items-center rounded-full bg-gray-200 ${ selected === index ? 'outline outline-3 outline-offset-4 outline-blue-500': '' }`}
                    key={size}
                    onClick={() => { setSize(size); setSelected(index); }}>
                        <div className='bg-gray-600 rounded-full' style={{width: size * 2, height: size * 2}}/>
                    </button>
                )
            }) }
        </div>
    )
}