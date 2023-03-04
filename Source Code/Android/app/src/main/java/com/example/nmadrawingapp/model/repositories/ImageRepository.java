package com.example.nmadrawingapp.model.repositories;

import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.nmadrawingapp.model.data_sources.db.Database;
import com.example.nmadrawingapp.model.data_sources.db.daos.ImageDao;
import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
import com.example.nmadrawingapp.model.data_sources.network.RetrofitClient;
import com.example.nmadrawingapp.model.data_sources.network.services.DrawingService;
import com.example.nmadrawingapp.model.enums.ResponseStatus;
import com.example.nmadrawingapp.utils.Callback;
import java.util.List;
import javax.inject.Inject;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Response;

public class ImageRepository implements IImageRepository {

    ImageDao imageDao;
    DrawingService api;

    @Inject
    public ImageRepository(ImageDao imageDao) {
        this.imageDao = imageDao;
        this.api = RetrofitClient.getInstance().getDrawingService();
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

    @Override
    public void uploadImage(Image image, Callback<ResponseStatus> callback) {

        MultipartBody.Part file = MultipartBody.Part.createFormData(
                "File",
                "image." + image.getExtension(),
                RequestBody.create(MediaType.parse("image/" + image.getExtension()),
                image.getImage())
        );

        api.postDrawing(image.getEventId(), file, image.getDrawersName(), image.getDrawersAge()).enqueue(new retrofit2.Callback<Void>() {
            @Override
            public void onResponse(@NonNull Call<Void> call, @NonNull Response<Void> response) {
                if (response.isSuccessful()) {
                    callback.onComplete(ResponseStatus.SUCCESS);
                } else if (response.code() == 400) {
                    callback.onComplete(ResponseStatus.INVALID_EVENT_ID);
                }else {
                    callback.onComplete(ResponseStatus.ERROR);
                }
            }

            @Override
            public void onFailure(@NonNull Call<Void> call, @NonNull Throwable t) {
                callback.onComplete(ResponseStatus.ERROR);
            }
        });

    }

}
