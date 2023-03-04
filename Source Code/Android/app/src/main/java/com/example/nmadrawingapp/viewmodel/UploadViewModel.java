package com.example.nmadrawingapp.viewmodel;

import static com.example.nmadrawingapp.view.UploadFragment.COLUMN_COUNT;
import static com.example.nmadrawingapp.view.UploadFragment.GAP;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;
import com.example.nmadrawingapp.model.DisplayImage;
import com.example.nmadrawingapp.model.Event;
import com.example.nmadrawingapp.model.UploadingResponse;
import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
import com.example.nmadrawingapp.model.enums.ItemType;
import com.example.nmadrawingapp.model.enums.ResponseStatus;
import com.example.nmadrawingapp.utils.Callback;
import com.example.nmadrawingapp.model.repositories.IImageRepository;
import java.util.ArrayList;
import java.util.List;
import javax.inject.Inject;
import dagger.hilt.android.lifecycle.HiltViewModel;

@HiltViewModel
public class UploadViewModel extends ViewModel {

    private final IImageRepository imageRepository;

    @Inject
    public UploadViewModel(IImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public LiveData<List<Object>> getAllImages() {

        MutableLiveData<List<Object>> data = new MutableLiveData<>();

        imageRepository.getAllImages(new Callback<List<Image>>() {
            @Override
            public void onComplete(List<Image> result) {

                final List<Object> items = new ArrayList<>();

                for (Image i : result) {

                    // group by event Id
                    if (!containsEvent(items, i.getEventId())) {
                        items.add(new Event(ItemType.Event, i.getEventId()));
                    }

                    items.add(new DisplayImage(ItemType.Image, i.getId(), toBitmap(i)));

                }

                data.postValue(items);
            }
        });

        return data;
    }

    private boolean containsEvent(List<Object> items, int id) {

        for (Object item : items) {
            if (item instanceof Event && ((Event) item).getEventId() == id) {
                return true;
            }
        }

        return false;
    }

    private Bitmap toBitmap(Image image) {
        // convert binary to bitmap
        Bitmap b = BitmapFactory.decodeByteArray(image.getImage(), 0, image.getImage().length);

        // calculate width and height (16:9 aspect ratio)
        int w = (b.getWidth() / COLUMN_COUNT) - (GAP * 2);
        int h = (int)(w * 0.5625);

        return Bitmap.createScaledBitmap(b, w, h, false);
    }

    public LiveData<UploadingResponse> uploadImage(int id) {

        MutableLiveData<UploadingResponse> status = new MutableLiveData<>(new UploadingResponse(id, ResponseStatus.LOADING));

        imageRepository.getImageById(id, new Callback<Image>() {
            @Override
            public void onComplete(Image image) {

                imageRepository.uploadImage(image, new Callback<ResponseStatus>() {
                    @Override
                    public void onComplete(ResponseStatus result) {

                        if (result == ResponseStatus.SUCCESS) {
                            status.postValue(new UploadingResponse(id, ResponseStatus.SUCCESS));
                            imageRepository.deleteImage(image);
                        } else if (result == ResponseStatus.INVALID_EVENT_ID) {
                            status.postValue(new UploadingResponse(id, ResponseStatus.INVALID_EVENT_ID));
                        } else {
                            status.postValue(new UploadingResponse(id, ResponseStatus.ERROR));
                        }

                    }
                });

            }
        });

        return status;
    }

}
