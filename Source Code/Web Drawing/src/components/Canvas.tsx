import { useEffect, useRef } from 'react';
import { Brush } from '../constants';
import { BrushSettings, PointerPosition } from '../drawing.types';
import { pen } from '../brushes';

export interface CanvasProps {
    brushSettings: BrushSettings
}

export default function Canvas({ brushSettings }: CanvasProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const pointer: PointerPosition = { x: 0, y: 0, down: false };
    const easing: number = 0.3;

    let container = containerRef.current;
    let canvas = canvasRef.current;
    let ctx = canvas?.getContext('2d');

    useEffect(() => {

        container = containerRef.current;
        canvas = canvasRef.current;
        ctx = canvas?.getContext('2d');

    }, [canvasRef.current, containerRef.current])

    useEffect(() => {

        if (canvas && container && ctx) {
            resizeCanvas(canvas, container, ctx); // set initial size
            setBrushSettings(ctx, brushSettings); // set initial brush settings
        }

        // register window events
        window.addEventListener('resize', windowResizeEvent);
        window.addEventListener('pointerup', pointerUpEvent)
        window.addEventListener('pointerdown', pointerDownEvent);
        window.addEventListener('pointermove', pointerMoveEvent);

        // cleanup events when unmounted
        return () => {
                window.removeEventListener('pointermove', pointerMoveEvent);
                window.removeEventListener('pointerdown', pointerDownEvent);
                window.removeEventListener('pointerup', pointerUpEvent);
                window.removeEventListener('resize', windowResizeEvent);
            }

    }, [brushSettings])

    const resizeCanvas = (canvas: HTMLCanvasElement, canvasParent: HTMLDivElement, ctx: CanvasRenderingContext2D) => {

        if (ctx && canvas && canvasParent) {

            const img = ctx.getImageData(0, 0, canvas.width, canvas.height);

            canvas.width = canvasParent.offsetWidth;
            canvas.height = canvasParent.offsetHeight;

            ctx.putImageData(img, 0, 0);

            setBrushSettings(ctx, brushSettings);
        }

    }

    const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, e: any) => {
        requestAnimationFrame(() => {
            if (ctx)  {
                
                // get mouse pos
                const pointerX = e.clientX - canvas.offsetLeft;
                const pointerY = e.clientY - canvas.offsetTop;

                // apply smoothing
                const smoothedX = pointer.x + ((pointerX - pointer.x) * easing);
                const smoothedY = pointer.y + ((pointerY - pointer.y) * easing);
                

                switch (brushSettings.type) {
                    case Brush.PEN:
                        pen(ctx, smoothedX, smoothedY, pointer.x, pointer.y);
                        break;
                }

                // set mouse pos
                pointer.x = smoothedX;
                pointer.y = smoothedY;
            }
        });
    }

    const pointerDownEvent = (e: any) => {
        if (canvas) {
            pointer.down = true;
            pointer.x = e.clientX - canvas.offsetLeft;
            pointer.y = e.clientY - canvas.offsetTop;
        }
    }

    const pointerMoveEvent = (e: any) => {
        if (pointer.down && canvas && ctx) {
            draw(canvas, ctx, e);
        }
    }

    const pointerUpEvent = () => {
        pointer.down = false;
    }

    const windowResizeEvent = () => {
        if (canvas && container && ctx) {            
            resizeCanvas(canvas, container, ctx);
        }
    }

    const setBrushSettings = (ctx: CanvasRenderingContext2D, brushSettings: BrushSettings) => {
        ctx.lineWidth = brushSettings.size;
        ctx.strokeStyle = brushSettings.colour;
        ctx.lineCap = 'round';
    }

    return (
        <div className='overflow-hidden touch-none' ref={containerRef}>
            <canvas ref={canvasRef}/>
        </div>
    )
}