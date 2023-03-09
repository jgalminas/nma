package com.example.nmadrawingapp.model;

import com.example.nmadrawingapp.model.enums.ItemType;

public abstract class Item {

    private final int Id;
    private final ItemType type;

    public Item (int Id, ItemType type) {
        this.type = type;
        this.Id = Id;
    }

    public ItemType getType() {
        return type;
    }

    public int getId() {
        return Id;
    }

    public Event toEvent() {
        return (Event) this;
    }

    public DisplayImage toImage() {
        return (DisplayImage) this;
    }

}
