package com.example.nmadrawingapp.model;

import java.util.ArrayList;
import java.util.List;

public class Event {

    private int eventId;
    private final List<DisplayImage> images = new ArrayList<>();

    public Event(int eventId) {
        this.eventId = eventId;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public List<DisplayImage> getImages() {
        return images;
    }
}
