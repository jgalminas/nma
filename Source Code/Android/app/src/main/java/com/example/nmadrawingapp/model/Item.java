package com.example.nmadrawingapp.model;

import com.example.nmadrawingapp.model.enums.ItemType;

public abstract class Item {

    private final ItemType type;

    public Item (ItemType type) {
        this.type = type;
    }

    public ItemType getType() {
        return type;
    }
}
