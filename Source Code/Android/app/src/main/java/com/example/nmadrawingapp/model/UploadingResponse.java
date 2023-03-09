package com.example.nmadrawingapp.model;

import com.example.nmadrawingapp.model.enums.Response;

public class UploadingResponse {

    private final Response status;
    private final int imageId;

    public UploadingResponse(int imageId, Response status) {
        this.imageId = imageId;
        this.status = status;
    }

    public boolean isSuccessful() {
        return status == Response.SUCCESS;
    }

    public Response getStatus() {
        return status;
    }

    public int getImageId() {
        return imageId;
    }
}
