package com.example.nmadrawingapp.views;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.LiveData;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.nmadrawingapp.R;
import com.example.nmadrawingapp.databinding.FragmentUploadBinding;
import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
import com.example.nmadrawingapp.model.repositories.ImageRepository;
import com.example.nmadrawingapp.views.adapters.ImageAdapter;
import com.example.nmadrawingapp.views.components.GridSpacingDecorator;

import java.util.List;

import javax.inject.Inject;

import dagger.hilt.android.AndroidEntryPoint;

@AndroidEntryPoint
public class UploadFragment extends Fragment {

    private FragmentUploadBinding binding;
    private LiveData<List<Image>> images;

    @Inject
    ImageRepository imageRepository; // for testing purposes

    public UploadFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        images = imageRepository.getAllImages(); // load images from local db
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        binding = FragmentUploadBinding.inflate(inflater, container, false);
        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        int columnCount = 3;

        ImageAdapter adapter = new ImageAdapter(images.getValue());
        RecyclerView.LayoutManager layoutManager = new GridLayoutManager(requireContext(), columnCount);
        GridSpacingDecorator separator = new GridSpacingDecorator(columnCount, 40);

        binding.imagesRecycler.setLayoutManager(layoutManager);
        binding.imagesRecycler.setItemAnimator(new DefaultItemAnimator());
        binding.imagesRecycler.setAdapter(adapter);
        binding.imagesRecycler.addItemDecoration(separator);

        images.observe(getViewLifecycleOwner(), images -> {
            adapter.setImages(images);
        });

    }

}