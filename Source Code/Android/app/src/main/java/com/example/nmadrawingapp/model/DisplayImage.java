package com.example.nmadrawingapp.model;

import android.graphics.Bitmap;

import com.example.nmadrawingapp.model.enums.ItemType;

public class DisplayImage extends Item {

    private final Bitmap image;
    private final int id;
    private boolean isUploading = false;
    private final int eventId;

    public DisplayImage(ItemType type, int id, Bitmap image, int eventId) {
        super(id, type);
        this.image = image;
        this.id = id;
        this.eventId = eventId;
    }

    public Bitmap getImage() {
        return image;
    }

    public int getId() {
        return id;
    }

    public boolean isUploading() {
        return isUploading;
    }

    public void setUploading(boolean uploading) {
        isUploading = uploading;
    }

    public int getEventId() {
        return eventId;
    }
}
