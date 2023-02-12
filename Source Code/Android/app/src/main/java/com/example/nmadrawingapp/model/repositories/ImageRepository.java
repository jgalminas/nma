package com.example.nmadrawingapp.model.repositories;

import androidx.lifecycle.LiveData;
import com.example.nmadrawingapp.model.data_sources.db.Database;
import com.example.nmadrawingapp.model.data_sources.db.daos.ImageDao;
import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
import java.util.List;
import javax.inject.Inject;

public class ImageRepository implements IImageRepository {

    ImageDao imageDao;

    @Inject
    public ImageRepository(ImageDao imageDao) {
        this.imageDao = imageDao;
    }

    @Override
    public LiveData<List<Image>> getAllImages() {
        return imageDao.getAll();
    }

    @Override
    public LiveData<Image> getImageById(int id) {
        return imageDao.findById(id);
    }

    @Override
    public LiveData<Integer> getImageCount() {
        return imageDao.getCount();
    }

    @Override
    public void insertImage(Image image) {
        Database.write.execute(() -> imageDao.insert(image));
    }

    @Override
    public void deleteImage(Image image) {
        Database.write.execute(() -> imageDao.delete(image));
    }

}
