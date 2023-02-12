package com.example.nmadrawingapp.viewmodel;

import androidx.lifecycle.ViewModel;

public class SharedViewModel extends ViewModel {

    private int eventId;

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public int getEventId() {
        return eventId;
    }
}
