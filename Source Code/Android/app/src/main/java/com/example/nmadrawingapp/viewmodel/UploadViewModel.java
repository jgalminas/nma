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
import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
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

    public LiveData<List<Event>> getAllEvents() {

        MutableLiveData<List<Event>> data = new MutableLiveData<>();

        imageRepository.getAllImages(new Callback<List<Image>>() {
            @Override
            public void onComplete(List<Image> result) {

                final List<Event> events = new ArrayList<>();

                for (Image i : result) {

                    // group by event Id
                    if (!containsEvent(events, i.getEventId())) {
                        events.add(new Event(i.getEventId()));
                    }

                    // add image to event
                    for (Event e : events) {
                        if (e.getEventId() == i.getEventId()) {
                            e.getImages().add(
                                new DisplayImage(i.getId(), toBitmap(i))
                            );
                        }
                    }

                }

                data.postValue(events);
            }
        });

        return data;
    }

    private boolean containsEvent(List<Event> events, int id) {

        for (Event event : events) {
            if (event.getEventId() == id) {
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

}
