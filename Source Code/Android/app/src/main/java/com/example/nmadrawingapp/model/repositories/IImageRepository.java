package com.example.nmadrawingapp.model.repositories;

import androidx.lifecycle.LiveData;
import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
import java.util.List;

public interface IImageRepository {

    LiveData<List<Image>> getAllImages();
    LiveData<Image> getImageById(int id);
    void insertImage(Image image);
    void deleteImage(Image image);

}
