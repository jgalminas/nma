import { useState } from 'react';
import Canvas from './components/Canvas';
import ColorPalette from './components/ColourPalette';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SizePalette from './components/SizePalette';
import { Brush } from './constants';
import { BrushSettings } from './drawing.types';

export default function App() {

    // colors in hex
    const colours: string[] = ['#565656', '#A1A1A1', '#FDA0E3', '#6892FF', '#7DE57B', '#FFBA52', '#FFF16F', '#FE5A6E', '#ffffff'];

    // sizes in px
    const sizes: number[] = [14, 12, 10, 8, 6, 4, 2];

    const [brushSettings, setBrushSettings] = useState<BrushSettings>({
        type: Brush.PEN,
        size: sizes[0],
        colour: colours[0]
    });

    const setSize = (size: number) => setBrushSettings({ ...brushSettings, size });
    const setColour = (colour: string) => setBrushSettings({ ...brushSettings, colour });
    const setBrush = (type: string) => setBrushSettings({ ...brushSettings, type });

    return (
        <div className='h-screen w-screen grid grid-cols-[min-content_auto] grid-rows-[min-content_auto] overflow-hidden'>

            <Sidebar>
                <SizePalette colour={brushSettings.colour} sizes={sizes} setSize={setSize}/>
            </Sidebar>
            
            <Header>
                <ColorPalette colours={colours} setColour={setColour}/>
            </Header>
            
            <Canvas brushSettings={brushSettings}/>
            
        </div>
    )
}


