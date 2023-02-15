package com.example.nmadrawingapp.view;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;

import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.nmadrawingapp.R;
import com.example.nmadrawingapp.databinding.FragmentStartBinding;
import com.example.nmadrawingapp.viewmodel.SharedViewModel;
import com.example.nmadrawingapp.viewmodel.StartViewModel;

import java.text.ParseException;

import dagger.hilt.android.AndroidEntryPoint;

@AndroidEntryPoint
public class StartFragment extends Fragment {

    private FragmentStartBinding binding;
    private NavController navController;
    private SharedViewModel sharedViewModel;
    private StartViewModel startViewModel;

    public StartFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        sharedViewModel = new ViewModelProvider(requireActivity()).get(SharedViewModel.class);
        startViewModel = new ViewModelProvider(this).get(StartViewModel.class);
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        binding = FragmentStartBinding.inflate(inflater, container, false);
        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        navController = Navigation.findNavController(view);

        // navigate to upload fragment
        binding.startUploadButton.setOnClickListener(btn -> {
            navController.navigate(R.id.uploadFragment);
        });

        // display number of images currently stored locally
        startViewModel.getImageCount().observe(getViewLifecycleOwner(), count -> {
            binding.drawingsNumLabel.setText(getString(R.string.drawings_to_upload, count));
        });


        // on event start
        binding.startButton.setOnClickListener(btn -> {
            if (isEventIdValid()) {
                sharedViewModel.setEventId(Integer.parseInt(binding.eventInput.getText().toString()));
                navController.navigate(R.id.drawingFragment);
            } else {
                binding.startErrorMessage.setVisibility(View.VISIBLE);
            }
        });

    }

    private boolean isEventIdValid() {
        // TODO validate fully based on ID criteria
        if (binding.startErrorMessage.getVisibility() == View.VISIBLE) {
            binding.startErrorMessage.setVisibility(View.GONE);
        }
        return binding.eventInput.getText().length() > 0;
    }

}