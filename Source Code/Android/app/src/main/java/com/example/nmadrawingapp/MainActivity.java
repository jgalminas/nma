package com.example.nmadrawingapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.LiveData;

import android.graphics.Color;
import android.os.Bundle;
import android.widget.Button;

import com.example.nmadrawingapp.databinding.ActivityMainBinding;
import com.example.nmadrawingapp.model.data_sources.db.Database;
import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
import com.example.nmadrawingapp.model.repositories.ImageRepository;
import com.example.nmadrawingapp.views.CanvasView;

import java.io.FileNotFoundException;
import java.util.List;
import java.util.UUID;

import javax.inject.Inject;

import dagger.hilt.android.AndroidEntryPoint;

@AndroidEntryPoint
public class MainActivity extends AppCompatActivity {

    private ActivityMainBinding binding;

    @Inject
    ImageRepository imageRepository; // for testing purposes

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        //region room read example

        LiveData<List<Image>> imageList = imageRepository.getAllImages();

        imageList.observe(this, images -> {
            binding.btn.setText("# of images in db: " + images.size());
        });

        //endregion

        //region room write example

        binding.btn.setOnClickListener(button -> {
            imageRepository.insertImage(new Image(UUID.randomUUID(), ".webp", binding.canvas.getImageBytes()));
        });

        //endregion

    }
}