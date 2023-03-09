package com.example.nmadrawingapp.model;

public abstract class Item {

    private final int Id;
    private final com.example.nmadrawingapp.model.enums.Item type;

    public Item (int Id, com.example.nmadrawingapp.model.enums.Item type) {
        this.type = type;
        this.Id = Id;
    }

    public com.example.nmadrawingapp.model.enums.Item getType() {
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
