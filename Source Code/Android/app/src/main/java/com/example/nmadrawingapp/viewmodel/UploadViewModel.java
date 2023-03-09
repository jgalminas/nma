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
import com.example.nmadrawingapp.model.Item;
import com.example.nmadrawingapp.model.UploadingResponse;
import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
import com.example.nmadrawingapp.model.enums.ItemType;
import com.example.nmadrawingapp.model.enums.Response;
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

    public LiveData<List<Item>> getAllImages() {

        MutableLiveData<List<Item>> data = new MutableLiveData<>();

        imageRepository.getAllImages(result -> {

            final List<Item> items = new ArrayList<>();

            for (Image i : result) {

                // group by event Id
                if (!containsEvent(items, i.getEventId())) {
                    items.add(new Event(ItemType.EVENT, i.getEventId()));
                }

                items.add(new DisplayImage(ItemType.IMAGE, i.getId(), toBitmap(i), i.getEventId()));

            }

            data.postValue(items);

        });

        return data;
    }

    private boolean containsEvent(List<Item> items, int id) {

        for (Item item : items) {
            if (item instanceof Event && ((Event) item).getId() == id) {
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

        MutableLiveData<UploadingResponse> status = new MutableLiveData<>(new UploadingResponse(id, Response.LOADING));

        imageRepository.getImageById(id, new Callback<Image>() {
            @Override
            public void onComplete(Image image) {

                imageRepository.uploadImage(image, new Callback<Response>() {
                    @Override
                    public void onComplete(Response result) {

                        if (result == Response.SUCCESS) {
                            status.postValue(new UploadingResponse(id, Response.SUCCESS));
                            imageRepository.deleteImage(image);
                        } else if (result == Response.INVALID_EVENT_ID) {
                            status.postValue(new UploadingResponse(id, Response.INVALID_EVENT_ID));
                        } else {
                            status.postValue(new UploadingResponse(id, Response.ERROR));
                        }

                    }
                });

            }
        });

        return status;
    }

    public void deleteImages(List<Integer> imageIds) {

        for (int id : imageIds) {
            imageRepository.deleteById(id);
        }

    }

}
