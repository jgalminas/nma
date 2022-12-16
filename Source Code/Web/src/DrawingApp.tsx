import Canvas from './components/drawing/Canvas';
import Header from './components/drawing/Header';
import Sidebar from './components/drawing/Sidebar';

export default function DrawingApp() {
    return (
        <div className='h-screen w-screen grid grid-cols-[min-content_auto] grid-rows-[min-content_auto]'>

            <Sidebar>
                
            </Sidebar>
            
            <Header>

            </Header>
            
            <Canvas/>
            
        </div>
    )
}


