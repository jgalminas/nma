package com.example.nmadrawingapp.model.repositories;

import com.example.nmadrawingapp.model.data_sources.db.Database;
import com.example.nmadrawingapp.model.data_sources.db.daos.ImageDao;
import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
import com.example.nmadrawingapp.utils.Callback;
import java.util.List;
import javax.inject.Inject;

public class ImageRepository implements IImageRepository {

    ImageDao imageDao;

    @Inject
    public ImageRepository(ImageDao imageDao) {
        this.imageDao = imageDao;
    }

    @Override
    public void getAllImages(Callback<List<Image>> callback) {

        Database.executor.execute(new Runnable() {
            @Override
            public void run() {
                callback.onComplete(imageDao.getAll());
            }
        });

    }

    @Override
    public void getImageById(int id, Callback<Image> callback) {
        Database.executor.execute(new Runnable() {
            @Override
            public void run() {
                callback.onComplete(imageDao.findById(id));
            }
        });
    }

    @Override
    public void getImageCount(Callback<Integer> callback) {
        Database.executor.execute(new Runnable() {
            @Override
            public void run() {
                callback.onComplete(imageDao.getCount());
            }
        });
    }

    @Override
    public void insertImage(Image image) {
        Database.executor.execute(() -> imageDao.insert(image));
    }

    @Override
    public void deleteImage(Image image) {
        Database.executor.execute(() -> imageDao.delete(image));
    }

}
