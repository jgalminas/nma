package com.example.nmadrawingapp.viewmodel;

import static com.example.nmadrawingapp.view.UploadFragment.COLUMN_COUNT;
import static com.example.nmadrawingapp.view.UploadFragment.GAP;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.view.WindowManager;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.nmadrawingapp.model.DisplayImage;
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

    private final MutableLiveData<List<DisplayImage>> images = new MutableLiveData<>(new ArrayList<>());

    public LiveData<List<DisplayImage>> getAllImages() {

        imageRepository.getAllImages(new Callback<List<Image>>() {
            @Override
            public void onComplete(List<Image> result) {

                List<DisplayImage> bitmaps = new ArrayList<>();

                for (Image i : result) {

                    // convert binary to bitmap
                    Bitmap b = BitmapFactory.decodeByteArray(i.getImage(), 0, i.getImage().length);

                    // calculate width and height (16:9 aspect ratio)
                    int w = (b.getWidth() / COLUMN_COUNT) - (GAP * 2);
                    int h = (int)(w * 0.5625);

                    // scale bitmap
                    bitmaps.add(
                        new DisplayImage(i.getId(), Bitmap.createScaledBitmap(b, w, h, false))
                    );
                }

                images.postValue(bitmaps);

            }
        });

        return images;
    }

}
