package com.example.nmadrawingapp.viewmodel;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.nmadrawingapp.model.data_sources.db.Database;
import com.example.nmadrawingapp.model.repositories.IImageRepository;
import com.example.nmadrawingapp.utils.Callback;

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

        MutableLiveData<Integer> imageCount = new MutableLiveData<>();

        imageRepository.getImageCount(new Callback<Integer>() {
            @Override
            public void onComplete(Integer result) {
                imageCount.postValue(result);
            }
        });

        return imageCount;
    }

}