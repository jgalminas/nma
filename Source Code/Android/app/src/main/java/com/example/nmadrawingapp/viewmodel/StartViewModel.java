package com.example.nmadrawingapp.viewmodel;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.ViewModel;
import com.example.nmadrawingapp.model.repositories.IImageRepository;
import javax.inject.Inject;
import dagger.hilt.android.lifecycle.HiltViewModel;

@HiltViewModel
public class StartViewModel extends ViewModel {

    private final IImageRepository imageRepository;

    @Inject
    public StartViewModel(IImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public LiveData<Integer> getImageCount() {
        return imageRepository.getImageCount();
    }

}