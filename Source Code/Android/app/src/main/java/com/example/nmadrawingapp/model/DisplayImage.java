package com.example.nmadrawingapp.model;

import android.graphics.Bitmap;

import com.example.nmadrawingapp.model.enums.Image;
import com.example.nmadrawingapp.model.enums.ItemType;

public class DisplayImage extends com.example.nmadrawingapp.model.Item {

    private final Bitmap image;
    private final int id;
    private Image status = Image.DEFAULT;
    private int eventId;

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

    public Image getStatus() {
        return status;
    }

    public void setStatus(Image status) {
        this.status = status;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int id) {
        this.eventId = id;
    }
}
