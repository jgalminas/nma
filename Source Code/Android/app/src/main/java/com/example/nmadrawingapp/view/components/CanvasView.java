package com.example.nmadrawingapp.view.components;

import android.content.Context;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;
import java.io.ByteArrayOutputStream;

public class CanvasView extends View {




    public static class BrushSettings {
        
        private final Paint paint = new Paint();

        private BrushSettings() {
            paint.setAntiAlias(true);
            paint.setDither(true);
            paint.setColor(Color.BLACK);
            paint.setStyle(Paint.Style.STROKE);
            paint.setStrokeJoin(Paint.Join.ROUND);
            paint.setStrokeCap(Paint.Cap.ROUND);
            paint.setStrokeWidth(15);
            paint.setXfermode(null);
        }

        public void setColor(int color) {
            paint.setColor(color);
        }

        public void setWidth(float width) {
            paint.setStrokeWidth(width);
        }

        public int getColor() {
            return paint.getColor();
        }

        public float getWidth() {
            return paint.getStrokeWidth();
        }

        public Paint.Style getStyle() {return  paint.getStyle(); }


        private Paint getPaint() {
            return paint;
        }
    }

    private Canvas canvas;
    private Bitmap bitmap;
    private Path path;
    private final BrushSettings brushSettings = new BrushSettings();

    private float pointerX, pointerY;
    private static final float TOUCH_TOLERANCE = 4;

    public CanvasView(Context context, AttributeSet attributeSet) {
        super(context, attributeSet);

        setFocusable(true);
        setFocusableInTouchMode(true);

        canvas = new Canvas();
        path = new Path();
    }

    @Override
    protected void onSizeChanged(int w, int h, int prevW, int prevH) {
        super.onSizeChanged(w, h, prevW, prevH);

        bitmap = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888);
        canvas = new Canvas(bitmap);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        canvas.drawBitmap(bitmap, 0, 0, brushSettings.getPaint());
        canvas.drawPath(path, brushSettings.getPaint());
    }

    private void onTouchStart(float x, float y) {
        path.reset();
        path.moveTo(x, y);
        pointerX = x;
        pointerY = y;
    }

    private void onTouchMove(float x, float y) {

        float diffX = Math.abs(x - pointerX);
        float diffY = Math.abs(y - pointerY);

        if (diffX >= TOUCH_TOLERANCE || diffY >= TOUCH_TOLERANCE) {
            path.quadTo(pointerX, pointerY, (x + pointerX)/2, (y + pointerY)/2);
            pointerX = x;
            pointerY = y;
        }
    }

    private void onTouchStop() {
        path.lineTo(pointerX, pointerY);
        canvas.drawPath(path, brushSettings.getPaint());
        path = new Path();
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {

        float x = event.getX();
        float y = event.getY();

        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:
                onTouchStart(x, y);
                invalidate();
                break;
            case MotionEvent.ACTION_MOVE:
                onTouchMove(x, y);
                invalidate();
                break;
            case MotionEvent.ACTION_UP:
                onTouchStop();
                invalidate();
                break;
        }

        return true;
    }

    public byte[] getImageBytes() {

        //TODO might have to move this to another thread, look into that a bit more
        //TODO could potentially scale the bitmap down to reduced the size even more

        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.WEBP, 100, stream);


        return stream.toByteArray();
    }

    public BrushSettings getBrushSettings() {
        return brushSettings;
    }

    public void setStyleFill(){
        brushSettings.paint.setStyle(Paint.Style.FILL);
    }

    public void setStyleStroke(){
        brushSettings.paint.setStyle((Paint.Style.STROKE));
    }

    public void setErase() {brushSettings.paint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.CLEAR)); }

    public void setNonErase() {brushSettings.paint.setXfermode(null);}
    public void clearCanvas() {
        canvas.drawColor(Color.WHITE, PorterDuff.Mode.CLEAR);
    }
}