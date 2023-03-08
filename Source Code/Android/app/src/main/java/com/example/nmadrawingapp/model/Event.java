package com.example.nmadrawingapp.model;

import com.example.nmadrawingapp.model.enums.ItemType;

public class Event extends Item {

    private int Id;
    private boolean showError = false;

    public Event(ItemType type, int Id) {
        super(Id, type);
        this.Id = Id;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        this.Id = id;
    }

    public boolean isShowError() {
        return showError;
    }

    public void setShowError(boolean showError) {
        this.showError = showError;
    }
}
