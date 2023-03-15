package com.example.nmadrawingapp.model.repositories;

import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
import com.example.nmadrawingapp.model.enums.Response;
import com.example.nmadrawingapp.utils.Callback;

import java.util.List;

public interface IImageRepository {

    void getAllImages(Callback<List<Image>> callback);
    void getImageById(int id, Callback<Image> callback);
    void getImageCount(Callback<Integer> callback);
    void insertImage(Image image);
    void deleteImage(Image image);
    void uploadImage(Image image, Callback<Response> callback);
    void deleteById(int id);
    void changeEventId(int currentId, int newId);

}
