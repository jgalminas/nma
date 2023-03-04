package com.example.nmadrawingapp.model;

import com.example.nmadrawingapp.model.enums.ResponseStatus;

public class UploadingResponse {

    private final ResponseStatus status;
    private final int imageId;

    public UploadingResponse(int imageId, ResponseStatus status) {
        this.imageId = imageId;
        this.status = status;
    }

    public boolean isSuccessful() {
        return status == ResponseStatus.SUCCESS;
    }

    public ResponseStatus getStatus() {
        return status;
    }

    public int getImageId() {
        return imageId;
    }
}
