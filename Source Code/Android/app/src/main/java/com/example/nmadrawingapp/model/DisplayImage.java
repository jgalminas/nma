package com.example.nmadrawingapp.model;

import android.graphics.Bitmap;

import com.example.nmadrawingapp.model.enums.ItemType;

public class DisplayImage extends Item {

    private final Bitmap image;
    private final int id;

    public DisplayImage(ItemType type, int id, Bitmap image) {
        super(type);
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
