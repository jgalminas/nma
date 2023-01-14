import { useEffect, useRef } from 'react';
import { Brush } from '../../constants';
import { BrushSettings, PointerPosition } from '../../types/drawing.types';

export interface CanvasProps {
    brushSettings: BrushSettings
}

export default function Canvas({ brushSettings }: CanvasProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const pointerPos: PointerPosition = { x: 0, y: 0 };
    let pointerDown: boolean = false;
    const easing: number = 0.3;

    let container = containerRef.current;
    let canvas = canvasRef.current;
    let ctx = canvas?.getContext('2d');

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

    }, [ctx, brushSettings])

    useEffect(() => {

        if (canvas && container && ctx) {
            resizeCanvas(canvas, container, ctx); // set initial size
            setBrushSettings(ctx); // set initial brush settings
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

    }, [])

    const resizeCanvas = (canvas: HTMLCanvasElement, canvasParent: HTMLDivElement, ctx: CanvasRenderingContext2D) => {

        if (ctx && canvas && canvasParent) {

            const img = ctx.getImageData(0, 0, canvas.width, canvas.height);

            canvas.width = canvasParent.offsetWidth;
            canvas.height = canvasParent.offsetHeight;

            ctx.putImageData(img, 0, 0);
        }

    }

    const pen = (ctx: CanvasRenderingContext2D, sx: number, sy: number, fx: number, fy: number) => {
        console.log("Pen");

        ctx.beginPath(); // begin
        ctx.moveTo(sx, sy); // from     
        ctx.lineTo(fx, fy); // to
        ctx.stroke(); // draw  
    }

    const eraser = (ctx: CanvasRenderingContext2D, sx: number, sy: number, fx: number, fy: number) => {
        
        console.log("Erasing");
        
        const radius = brushSettings.size / 2;

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.arc(fx, fy, radius, 0, 2 * Math.PI, false);
        ctx.clip();
        ctx.clearRect(fx - radius - 1, fy - radius - 1, radius * 2 + 2, radius * 2 + 2);
    }

    const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, e: any, brush: (ctx: CanvasRenderingContext2D, sx: number, sy: number, fx: number, fy: number) => void) => {
        requestAnimationFrame(() => {
            if (ctx)  {
                
                // get mouse pos
                const pointerX = e.clientX - canvas.offsetLeft;
                const pointerY = e.clientY - canvas.offsetTop;

                // apply smoothing
                const smoothedX = pointerPos.x + ((pointerX - pointerPos.x) * easing);
                const smoothedY = pointerPos.y + ((pointerY - pointerPos.y) * easing);
                
                brush(ctx, smoothedX, smoothedY, pointerPos.x, pointerPos.y);


                // if (brushSettings.type === Brush.PEN) {
                //     ctx.beginPath(); // begin
                //     ctx.moveTo(smoothedX, smoothedY); // from     
                //     ctx.lineTo(pointerPos.x, pointerPos.y); // to
                //     ctx.stroke(); // draw  
                // } else {
                //     // var clearCircle = function(x, y, radius)
                //     //     {
                //     //         context.beginPath();
                //     //         context.arc(x, y, radius, 0, 2 * Math.PI, false);
                //     //         context.clip();
                //     //         context.clearRect(x - radius - 1, y - radius - 1,
                //     //                         radius * 2 + 2, radius * 2 + 2);
                //     //     };

                //     const radius = brushSettings.size / 2;

                //     ctx.beginPath();
                //     ctx.moveTo(smoothedX, smoothedY);
                //     ctx.arc(pointerPos.x, pointerPos.y, radius, 0, 2 * Math.PI, false);
                //     ctx.clip();
                //     ctx.clearRect(pointerPos.x - radius - 1, pointerPos.y - radius - 1, radius * 2 + 2, radius * 2 + 2);

                // }



                // set mouse pos
                pointerPos.x = smoothedX;
                pointerPos.y = smoothedY;
            }
        });
    }

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
                if (brushSettings.type === Brush.PEN) {
                    draw(canvas, ctx, e, pen);
                } else {
                    draw(canvas, ctx, e, eraser);
                }
            }
        }
    }

    const pointerUpEvent = () => {
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

    return (
        <div className='overflow-hidden touch-none' ref={containerRef}>
            <canvas ref={canvasRef}/>
        </div>
    )
}