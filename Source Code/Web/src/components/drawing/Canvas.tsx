import { useEffect, useRef } from 'react';
import { BrushSettings, MousePosition } from '../../types/drawing.types';

export interface CanvasProps {
    brushSettings: BrushSettings
}

export default function Canvas({ brushSettings }: CanvasProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    let mousePos: MousePosition = { x: 0, y: 0 };    

    useEffect(() => {
        
        const ctx = canvasRef.current?.getContext('2d');
        const canvas = canvasRef?.current;
        const container = containerRef?.current;
                

        if (canvas && container && ctx) {

            resizeCanvas(canvas, container); // set initial size
            
            const mouseMoveEvent = (e: any) => draw(canvas,ctx, e);
            const resizeEvent = () => resizeCanvas(canvas, container);
            const mouseDownEvent = (e: any) => setMousePosition(canvas, e);

            window.addEventListener('mousedown', mouseDownEvent);
            window.addEventListener('mousemove', mouseMoveEvent);
            window.addEventListener('resize', resizeEvent);

            // cleanup events when unmounted
            return () => {
                window.removeEventListener('resize', resizeEvent);
                window.removeEventListener('mousemove', mouseMoveEvent);
                window.removeEventListener('resize', mouseDownEvent);
            }
        }

    }, [brushSettings])


    const resizeCanvas = (canvas: HTMLCanvasElement, canvasParent: HTMLDivElement) => {

        const ctx = canvas.getContext('2d');

        if (ctx && canvas && canvasParent) {

            const img = ctx.getImageData(0, 0, canvas.width, canvas.height);

            canvas.width = canvasParent.offsetWidth;
            canvas.height = canvasParent.offsetHeight;

            ctx.putImageData(img, 0, 0);
        }

    }

    const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, e: any) => {
        if (e.buttons !== 1) return;        

        requestAnimationFrame(() => {
            if (ctx)  {
                ctx.beginPath(); // begin
                
                ctx.lineWidth = brushSettings.size;
                ctx.lineCap = 'round';
                ctx.strokeStyle = brushSettings.colour;
                
                ctx.moveTo(mousePos.x, mousePos.y); // from
                
                setMousePosition(canvas, e);
    
                ctx.lineTo(mousePos.x, mousePos.y); // to
                
                ctx.stroke(); // draw
            }
        });
    }

    const setMousePosition = (canvas: HTMLCanvasElement, e: any) => {
        mousePos = { x: (e.clientX - canvas.offsetLeft), y: (e.clientY - canvas.offsetTop) }
    }

    return (
        <div className='overflow-hidden' ref={containerRef}>
            <canvas ref={canvasRef}/>
        </div>
    )
}