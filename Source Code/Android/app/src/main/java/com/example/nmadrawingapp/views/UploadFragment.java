package com.example.nmadrawingapp.views;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
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
import com.example.nmadrawingapp.databinding.FragmentUploadBinding;
import com.example.nmadrawingapp.model.DisplayImage;
import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
import com.example.nmadrawingapp.model.repositories.ImageRepository;
import com.example.nmadrawingapp.views.adapters.ImageAdapter;
import com.example.nmadrawingapp.views.components.GridSpacingDecorator;
import java.util.ArrayList;
import java.util.List;
import javax.inject.Inject;

import dagger.hilt.android.AndroidEntryPoint;

@AndroidEntryPoint
public class UploadFragment extends Fragment {

    private FragmentUploadBinding binding;
    private LiveData<List<Image>> images;

    private static final int COLUMN_COUNT = 3; // num of columns in recycler view grid
    private static final int GAP = 40; // gap size between items in recycler view

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
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        binding = FragmentUploadBinding.inflate(inflater, container, false);
        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        ImageAdapter adapter = new ImageAdapter();
        RecyclerView.LayoutManager layoutManager = new GridLayoutManager(requireContext(), COLUMN_COUNT);
        GridSpacingDecorator separator = new GridSpacingDecorator(COLUMN_COUNT, GAP);

        binding.imagesRecycler.setLayoutManager(layoutManager);
        binding.imagesRecycler.setItemAnimator(new DefaultItemAnimator());
        binding.imagesRecycler.setAdapter(adapter);
        binding.imagesRecycler.addItemDecoration(separator);

        images.observe(getViewLifecycleOwner(), images -> {

            List<DisplayImage> bitmaps = new ArrayList<>();

            // get recycler width - gaps
            int w = (binding.imagesRecycler.getWidth() / COLUMN_COUNT) - (GAP * 2);

            // getting height following 16:9 aspect ratio
            int h = (int)(w * 0.5625);

            for (Image i : images) {
                // convert binary to bitmap
                Bitmap b = BitmapFactory.decodeByteArray(i.getImage(), 0, i.getImage().length);

                // scale bitmap
                bitmaps.add(
                        new DisplayImage(i.getId(), Bitmap.createScaledBitmap(b, w, h, false))
                );
            }

            adapter.setImages(bitmaps);

        });

        // display how many images are selected
        adapter.getSelectedImages().observe(getViewLifecycleOwner(), images -> {
            if (adapter.getItemCount() > 0) {
                binding.selected.setText(images.size() + " of " + adapter.getItemCount() + " drawings selected");
            }
        });

    }

}