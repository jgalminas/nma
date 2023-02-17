package com.example.nmadrawingapp.model;

import com.example.nmadrawingapp.model.enums.ItemType;

public class Event extends Item {

    private int eventId;

    public Event(ItemType type, int eventId) {
        super(type);
        this.eventId = eventId;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

}
