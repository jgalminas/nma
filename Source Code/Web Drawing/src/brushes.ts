
export const pen = (ctx: CanvasRenderingContext2D, sx: number, sy: number, fx: number, fy: number) => {

    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath(); // begin
    ctx.moveTo(sx, sy); // from     
    ctx.lineTo(fx, fy); // to
    ctx.stroke(); // draw  
}