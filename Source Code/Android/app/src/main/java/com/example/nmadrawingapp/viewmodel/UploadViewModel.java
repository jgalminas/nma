package com.example.nmadrawingapp.viewmodel;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.nmadrawingapp.model.DisplayImage;
import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
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

    public LiveData<List<Image>> getAllImages() {
        return imageRepository.getAllImages();
    }

}
