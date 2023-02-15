package com.example.nmadrawingapp.model.repositories;

import androidx.lifecycle.LiveData;
import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
import com.example.nmadrawingapp.utils.Callback;

import java.util.List;

public interface IImageRepository {

    void getAllImages(Callback<List<Image>> callback);
    void getImageById(int id, Callback<Image> callback);
    void getImageCount(Callback<Integer> callback);
    void insertImage(Image image);
    void deleteImage(Image image);

}
