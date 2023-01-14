import { useEffect, useRef, useState } from 'react';
import { BrushSettings, PointerPosition } from '../../types/drawing.types';

export interface CanvasProps {
    brushSettings: BrushSettings,
    isErasing: boolean
}

export default function Canvas({ brushSettings, isErasing }: CanvasProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const pointerPos: PointerPosition = { x: 0, y: 0 };
    let pointerDown: boolean = false;

    const easing: number = 0.3;

    let container = containerRef.current;
    let canvas = canvasRef.current;
    let ctx = canvas?.getContext('2d');

    const pointerDownEvent = (e: any) => {
        if (canvas) {
            pointerDown = true;
            pointerPos.x = e.clientX - canvas.offsetLeft;
            pointerPos.y = e.clientY - canvas.offsetTop;
        }
    }

    const pointerMoveEvent = (e: any) => {
        if (pointerDown) {
            if (canvas && ctx) {
                draw(canvas, ctx, e);
            }
        }
    }

    const pointerUpEvent = (e: any) => {
        pointerDown = false;
    }

    const windowResizeEvent = () => {
        if (canvas && container && ctx) {
            resizeCanvas(canvas, container, ctx);
        }
    }

    const setBrushSettings = (ctx: CanvasRenderingContext2D) => {
        ctx.lineWidth = brushSettings.size;
        ctx.strokeStyle = brushSettings.colour;
        ctx.lineCap = 'round';
    }

    useEffect(() => {

        container = containerRef.current;
        canvas = canvasRef.current;
        ctx = canvas?.getContext('2d');

        if (ctx) {
            setBrushSettings(ctx);
        }

    }, [canvasRef.current, containerRef.current])


    useEffect(() => {

        if (ctx) {

            setBrushSettings(ctx);
        }

    }, [ctx, isErasing, brushSettings])

    useEffect(() => {

        if (canvas && container && ctx) {

            resizeCanvas(canvas, container, ctx); // set initial size
            
            //const pointerMoveEvent = (e: any) => draw(canvas,ctx, e); // draw on pointer move
            // const pointerDownEvent = (e: any) =>  {
            //     pointerPos.x = e.clientX - canvas.offsetLeft;
            //     pointerPos.y = e.clientY - canvas.offsetTop;
            // };

            // // resize canvas on window resize
            // const resizeEvent = () => resizeCanvas(canvas, container);

            // window.addEventListener('resize', resizeEvent);


        }

        window.addEventListener('resize', windowResizeEvent);
        window.addEventListener('pointerup', pointerUpEvent)
        window.addEventListener('pointerdown', pointerDownEvent);
        window.addEventListener('pointermove', pointerMoveEvent);

        // // cleanup events when unmounted
        return () => {
            //     window.removeEventListener('resize', resizeEvent);
                window.removeEventListener('pointermove', pointerMoveEvent);
                window.removeEventListener('pointerdown', pointerDownEvent);
                window.removeEventListener('pointerup', pointerUpEvent);
                window.removeEventListener('resize', windowResizeEvent);
            }

    }, [])

    const resizeCanvas = (canvas: HTMLCanvasElement, canvasParent: HTMLDivElement, ctx: CanvasRenderingContext2D) => {

        if (ctx && canvas && canvasParent) {

            const img = ctx.getImageData(0, 0, canvas.width, canvas.height);

            canvas.width = canvasParent.offsetWidth;
            canvas.height = canvasParent.offsetHeight;

            ctx.putImageData(img, 0, 0);
        }

    }

    const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, e: any) => {
        requestAnimationFrame(() => {
            if (ctx)  {
                
                // get mouse pos
                const pointerX = e.clientX - canvas.offsetLeft;
                const pointerY = e.clientY - canvas.offsetTop;

                // apply smoothing
                const smoothedX = pointerPos.x + ((pointerX - pointerPos.x) * easing);
                const smoothedY = pointerPos.y + ((pointerY - pointerPos.y) * easing);

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
        <div className='overflow-hidden touch-none'
            // onPointerDown={pointerDownEvent}
            // onPointerMove={pointerMoveEvent}
            // onPointerUp={pointerUpEvent}
            // onResize={windowResizeEvent}
            ref={containerRef}>
            <canvas ref={canvasRef}/>
        </div>
    )
}