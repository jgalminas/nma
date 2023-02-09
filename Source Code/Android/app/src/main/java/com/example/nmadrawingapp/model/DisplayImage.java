package com.example.nmadrawingapp.model;

import android.graphics.Bitmap;

public class DisplayImage {

    private final Bitmap image;
    private final int id;

    public DisplayImage(int id, Bitmap image) {
        this.image = image;
        this.id = id;
    }

    public Bitmap getImage() {
        return image;
    }

    public int getId() {
        return id;
    }

}
