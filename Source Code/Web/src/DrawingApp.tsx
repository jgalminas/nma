import Canvas from './components/drawing/Canvas';
import ColorPalette from './components/drawing/ColourPalette';
import Header from './components/drawing/Header';
import Sidebar from './components/drawing/Sidebar';
import SizePalette from './components/drawing/SizePalette';
import { BrushSettings } from './types/drawing.types';

export default function DrawingApp() {

    // colors in hex
    const colours: string[] = ['#565656', '#A1A1A1', '#FDA0E3', '#6892FF', '#7DE57B', '#FFBA52', '#FFF16F', '#FE5A6E'];

    // sizes in px
    const sizes: number[] = [14, 12, 10, 8, 6, 4, 2];

    const brushSettings: BrushSettings = {
        size: sizes[0],
        colour: colours[0]
    }

    const setSize = (size: number) => brushSettings.size = size;
    const setColour = (colour: string) => brushSettings.colour = colour;

    return (
        <div className='h-screen w-screen grid grid-cols-[min-content_auto] grid-rows-[min-content_auto] overflow-hidden'>

            <Sidebar>
                <SizePalette sizes={sizes} setSize={setSize}/>
            </Sidebar>
            
            <Header>
                <ColorPalette colours={colours} setColour={setColour}/>
            </Header>
            
            <Canvas brushSettings={brushSettings}/>
            
        </div>
    )
}


