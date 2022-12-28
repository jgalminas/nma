import { useEffect, useRef } from 'react';
import { BrushSettings, PointerPosition } from '../../types/drawing.types';

export interface CanvasProps {
    brushSettings: BrushSettings
}

export default function Canvas({ brushSettings }: CanvasProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const pointerPos: PointerPosition = { x: 0, y: 0 };
    const easing: number = 0.3;

    useEffect(() => {
        
        const ctx = canvasRef.current?.getContext('2d');
        const canvas = canvasRef?.current;
        const container = containerRef?.current;
                

        if (canvas && container && ctx) {

            resizeCanvas(canvas, container); // set initial size
            
            const pointerMoveEvent = (e: any) => draw(canvas,ctx, e); // draw on pointer move
            
            // set initial pointer position on drawing start
            const pointerDownEvent = (e: any) =>  {
                pointerPos.x = e.clientX - canvas.offsetLeft;
                pointerPos.y = e.clientY - canvas.offsetTop;
            };

            // resize canvas on window resize
            const resizeEvent = () => resizeCanvas(canvas, container);

            window.addEventListener('pointerdown', pointerDownEvent);
            window.addEventListener('pointermove', pointerMoveEvent);
            window.addEventListener('resize', resizeEvent);

            // cleanup events when unmounted
            return () => {
                window.removeEventListener('resize', resizeEvent);
                window.removeEventListener('pointermove', pointerMoveEvent);
                window.removeEventListener('pointerdown', pointerDownEvent);
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
                
                // get mouse pos
                const pointerX = e.clientX - canvas.offsetLeft;
                const pointerY = e.clientY - canvas.offsetTop;

                // apply smoothing
                const smoothedX = pointerPos.x + ((pointerX - pointerPos.x) * easing);
                const smoothedY = pointerPos.y + ((pointerY - pointerPos.y) * easing)


                // line settings
                ctx.lineWidth = brushSettings.size;
                ctx.lineCap = 'round';
                ctx.strokeStyle = brushSettings.colour;

                ctx.beginPath(); // begin
                ctx.moveTo(smoothedX, smoothedY); // from     
                ctx.lineTo(pointerPos.x, pointerPos.y); // to
                ctx.stroke(); // draw


                // set mouse pos
                pointerPos.x = smoothedX;
                pointerPos.y = smoothedY;
            }
        });
    }

    return (
        <div className='overflow-hidden' ref={containerRef}>
            <canvas ref={canvasRef}/>
        </div>
    )
}