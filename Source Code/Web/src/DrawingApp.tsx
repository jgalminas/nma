import Canvas from './components/drawing/Canvas';
import ColorPalette from './components/drawing/ColourPalette';
import Header from './components/drawing/Header';
import Sidebar from './components/drawing/Sidebar';
import { BrushSettings } from './types/drawing.types';

export default function DrawingApp() {

    // colors in hex
    const colours: string[] = ['#565656', '#A1A1A1', '#FDA0E3', '#6892FF', '#7DE57B', '#FFBA52', '#FFF16F', '#FE5A6E'];

    const brushSettings: BrushSettings = {
        size: 10,
        colour: colours[0]
    }

    const setColour = (colour: string) => brushSettings.colour = colour;
 
    return (
        <div className='h-screen w-screen grid grid-cols-[min-content_auto] grid-rows-[min-content_auto] overflow-hidden'>

            <Sidebar>
                
            </Sidebar>
            
            <Header>
                <ColorPalette colours={colours} setColour={setColour}/>
            </Header>
            
            <Canvas brushSettings={brushSettings}/>
            
        </div>
    )
}


