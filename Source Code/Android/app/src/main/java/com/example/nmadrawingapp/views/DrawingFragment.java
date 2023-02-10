package com.example.nmadrawingapp.views;

import android.app.AlertDialog;
import android.app.Dialog;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.LiveData;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;

import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;

import com.example.nmadrawingapp.R;
import com.example.nmadrawingapp.databinding.FragmentDrawingBinding;
import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
import com.example.nmadrawingapp.model.repositories.ImageRepository;

import java.util.List;

import javax.inject.Inject;

import dagger.hilt.android.AndroidEntryPoint;

@AndroidEntryPoint
public class DrawingFragment extends Fragment {

    private FragmentDrawingBinding binding;
    private NavController navController;
    private Dialog dialog;

    @Inject
    ImageRepository imageRepository; // for testing purposes

    public DrawingFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        binding = FragmentDrawingBinding.inflate(inflater, container, false);
        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        navController = Navigation.findNavController(view); // initiate nav controller


        binding.uploadButton.setOnClickListener(button -> {
            navController.navigate(R.id.uploadFragment);
        });


        //region room read example

        LiveData<List<Image>> imageList = imageRepository.getAllImages();

        imageList.observe(getViewLifecycleOwner(), images -> {
            binding.btn.setText("# of images in db: " + images.size());
        });

        //endregion


        binding.btn.setOnClickListener(button -> {
            showDialog();
        });

    }

    private Dialog createDialog() {

        AlertDialog.Builder builder = new AlertDialog.Builder(requireContext());

        LayoutInflater inflater = this.getLayoutInflater();

        builder.setView(inflater.inflate(R.layout.save_image_dialog, null));

        return builder.create();
    }

    private void showDialog() {

        dialog = createDialog();

        dialog.show(); // must show dialog before registering listeners

        EditText ageInput = dialog.findViewById(R.id.age_input);

        // register on cancel listener
        dialog.findViewById(R.id.cancel_button).setOnClickListener(button -> {
            dialog.cancel();
        });

        // register on save listener
        dialog.findViewById(R.id.save_button).setOnClickListener(button -> {

            int age = parseAge(ageInput.getText().toString());
            boolean ageIsValid = validateAge(age);

            if (ageIsValid) {
                imageRepository.insertImage(new Image(
                        age,
                        binding.canvas.getImageBytes()
                ));

                binding.canvas.clearCanvas();
                dialog.dismiss();

            }

        });

        // validate age input on text change
        ageInput.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void afterTextChanged(Editable text) {
                if (validateAge(parseAge(text.toString()))) {
                    dialog.findViewById(R.id.error_message).setVisibility(View.GONE);
                } else {
                    dialog.findViewById(R.id.error_message).setVisibility(View.VISIBLE);
                }
            }
        });

    }

    private boolean validateAge(int age) {
        return age > 0 && age <= 130;
    }

    private int parseAge(String text) {
        try {
            return Integer.parseInt(text);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

}