import { useEffect, useRef } from 'react';

export interface CanvasProps {
    
}

export default function Canvas({  }: CanvasProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    let mousePos: { x:number , y:number } = { x: 0, y: 0 };

    useEffect(() => {

        const ctx = canvasRef.current?.getContext('2d');
        const canvas = canvasRef?.current;
        const container = containerRef?.current;

        if (canvas && container && ctx) {

            resizeCanvas(canvas, container);

            const mouseMoveEvent = (e: any) => draw(canvas,ctx, e);
            const resizeEvent = () => resizeCanvas(canvas, container);
            const mouseDownEvent = (e: any) => setPos(canvas, e);

            window.addEventListener('mousedown', mouseDownEvent)
            window.addEventListener('mousemove', mouseMoveEvent)
            window.addEventListener('resize', resizeEvent)

            return () => {
                window.removeEventListener('resize', resizeEvent);
                window.removeEventListener('mousemove', mouseMoveEvent);
                window.removeEventListener('resize', mouseDownEvent);
            }
        }

    }, [])

    const resizeCanvas = (canvas: HTMLCanvasElement, canvasParent: HTMLDivElement) => {
        if (canvas && canvasParent) {
            canvas.width = canvasParent.offsetWidth;
            canvas.height = canvasParent.offsetHeight;
        }
    }

    const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, e: any) => {
        if (e.buttons !== 1) return;
        
        if (ctx)  {
            ctx.beginPath(); // begin
        
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#c0392b';
            
            ctx.moveTo(mousePos.x, mousePos.y); // from
            
            setPos(canvas, e);

            ctx.lineTo(mousePos.x, mousePos.y); // to
            
            ctx.stroke(); // draw it!
        }
    }

    const setPos = (canvas: HTMLCanvasElement, e: any) => {
        mousePos = { x: (e.clientX - canvas.offsetLeft), y: (e.clientY - canvas.offsetTop) }
    }

    return (
        <div ref={containerRef}>
            <canvas ref={canvasRef}/>
        </div>
    )
}