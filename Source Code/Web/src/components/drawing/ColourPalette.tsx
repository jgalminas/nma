import { useState } from 'react';

export interface ColorPaletteProps {
    colours: string[],
    setColour: (colour: string) => void
}

export default function ColorPalette({ colours, setColour }: ColorPaletteProps) {

    const [selected, setSelected] = useState<number>(0);

    return (
        <div className='flex gap-3'>
            { colours.map((colour, index) => {
                return (
                <button className={`w-9 h-9 rounded-full ${ selected === index ? 'outline outline-3 outline-offset-4 outline-blue-500': '' }`}
                    key={colour}
                    style={{backgroundColor: colour}}
                    onClick={() => { setColour(colour); setSelected(index); }}/>
                )
            }) }
        </div>
    )
}