package com.example.nmadrawingapp.view;

import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.GridLayoutManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import com.example.nmadrawingapp.R;
import com.example.nmadrawingapp.databinding.FragmentUploadBinding;
import com.example.nmadrawingapp.view.adapters.ImageAdapter;
import com.example.nmadrawingapp.viewmodel.UploadViewModel;
import dagger.hilt.android.AndroidEntryPoint;

@AndroidEntryPoint
public class UploadFragment extends Fragment {

    public static final int COLUMN_COUNT = 5; // num of columns in recycler view grid
    public static final int GAP = 40; // gap size between items in recycler view

    private FragmentUploadBinding binding;
    private UploadViewModel uploadViewModel;

    public UploadFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        uploadViewModel = new ViewModelProvider(this).get(UploadViewModel.class);
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

        GridLayoutManager layoutManager = new GridLayoutManager(requireContext(), COLUMN_COUNT);
        ImageAdapter adapter = new ImageAdapter(layoutManager);

        binding.imagesRecycler.setLayoutManager(layoutManager);
        binding.imagesRecycler.setItemAnimator(new DefaultItemAnimator());
        binding.imagesRecycler.setAdapter(adapter);

        // get locally stored drawings
        uploadViewModel.getAllImages().observe(getViewLifecycleOwner(), images -> {
            adapter.setImages(images);
        });

        // display how many images are selected
        adapter.getSelectedImages().observe(getViewLifecycleOwner(), images -> {
            if (adapter.getItemCount() > 0) {
                binding.selected.setText(getString(R.string.drawings_selected, images.size(), adapter.getImageCount()));
            }
        });

    }

}