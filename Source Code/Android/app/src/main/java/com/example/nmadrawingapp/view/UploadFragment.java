package com.example.nmadrawingapp.view;

import android.app.AlertDialog;
import android.app.Dialog;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.GridLayoutManager;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.nmadrawingapp.R;
import com.example.nmadrawingapp.databinding.FragmentUploadBinding;
import com.example.nmadrawingapp.model.enums.Image;
import com.example.nmadrawingapp.model.enums.Response;
import com.example.nmadrawingapp.utils.SafeToast;
import com.example.nmadrawingapp.view.adapters.ImageAdapter;
import com.example.nmadrawingapp.viewmodel.UploadViewModel;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import dagger.hilt.android.AndroidEntryPoint;

@AndroidEntryPoint
public class UploadFragment extends Fragment {

    public static final int COLUMN_COUNT = 4; // num of columns in recycler view grid
    public static final int GAP = 40; // gap size between items in recycler view

    private FragmentUploadBinding binding;
    private UploadViewModel uploadViewModel;
    private Dialog dialog;

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

        // set up image recycler view
        GridLayoutManager layoutManager = new GridLayoutManager(requireContext(), COLUMN_COUNT);
        ImageAdapter adapter = new ImageAdapter(uploadViewModel, layoutManager, createDialog(R.layout.dialog_change_event_id));
        binding.imagesRecycler.setLayoutManager(layoutManager);
        binding.imagesRecycler.setItemAnimator(new DefaultItemAnimator());
        binding.imagesRecycler.setAdapter(adapter);

        // get locally stored drawings
        uploadViewModel.getAllImages().observe(getViewLifecycleOwner(), images -> {
            adapter.setImages(images);
        });

        // display how many images are selected
        displaySelectedImageAmount(adapter);

        // number of images currently being uploaded
        MutableLiveData<Integer> uploading = new MutableLiveData<>(0);

        // disable upload button while currently uploading
        disableUploadButtonWhileUploading(uploading);

        // handle upload button click
        onUploadButtonClick(adapter, uploadViewModel, uploading);

        onDeleteButtonClick(adapter, uploadViewModel);

    }

    private void displaySelectedImageAmount(ImageAdapter adapter) {
        adapter.getSelectedImages().observe(getViewLifecycleOwner(), images -> {
            if (adapter.getItemCount() > 0) {
                binding.selected.setText(getString(R.string.drawings_selected, images.size(), adapter.getImageCount()));
            } else {
                binding.selected.setText("");
            }
        });
    }

    private void disableUploadButtonWhileUploading(LiveData<Integer> uploading) {
        uploading.observe(getViewLifecycleOwner(), up -> {
            binding.sendButton.setEnabled(up == 0);
        });
    }

    private void onUploadButtonClick(ImageAdapter adapter, UploadViewModel uploadViewModel, MutableLiveData<Integer> uploading) {

        binding.sendButton.setOnClickListener(button -> {

            List<Integer> selectedImages = adapter.getSelectedImages().getValue();
            if (selectedImages.size() > 0) {
                for (int imageId : selectedImages) {

                    uploadViewModel.uploadImage(imageId).observe(getViewLifecycleOwner(), status -> {

                        // check if image is loading
                        if (status.getStatus() == Response.LOADING) {
                            adapter.showEventError(imageId, false);
                            adapter.setImageLoadingStatus(imageId, Image.UPLOADING);

                            // increase currently uploading number
                            uploading.setValue(uploading.getValue() + 1);
                        } else {
                            // reduce currently uploading number
                            uploading.setValue(uploading.getValue() - 1);
                        }

                        // handle result
                        if (status.isSuccessful()) {
                            adapter.removeImage(status.getImageId());
                        } else if (status.getStatus() == Response.INVALID_EVENT_ID) {
                            adapter.showEventError(imageId, true);
                            adapter.setImageLoadingStatus(imageId, Image.DEFAULT);
                        } else if (status.getStatus() == Response.ERROR) {
                            adapter.setImageLoadingStatus(imageId, Image.ERROR);
                        }

                    });
                }
            } else {
                SafeToast.makeText(getContext(), "No drawing(s) selected", Toast.LENGTH_LONG);
            }
        });

    }

    private void onDeleteButtonClick(ImageAdapter adapter, UploadViewModel uploadViewModel) {
        binding.deleteButton.setOnClickListener(button -> {
            if (adapter.getSelectedImages().getValue().size() > 0) {
                showDialog(R.layout.dialog_confirm_delete, adapter, uploadViewModel);
            } else {
                SafeToast.makeText(getContext(), "No drawing(s) selected", Toast.LENGTH_LONG);
            }
        });
    }

    private Dialog createDialog(int layout) {

        AlertDialog.Builder builder = new AlertDialog.Builder(requireContext());
        LayoutInflater inflater = this.getLayoutInflater();
        builder.setView(inflater.inflate(layout, null));

        return builder.create();
    }

    private void showDialog(int layout, ImageAdapter adapter, UploadViewModel uploadViewModel) { ;
        dialog = createDialog(layout);

        // make background transparent
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

        dialog.show(); // must show dialog before registering listeners

        // register on cancel listener
        dialog.findViewById(R.id.negative_button).setOnClickListener(button -> {
            dialog.dismiss();
        });

        // register on confirm listener
        dialog.findViewById(R.id.positive_button).setOnClickListener(button -> {
            ArrayList<Integer> selected = Objects.requireNonNull(adapter.getSelectedImages().getValue()); // Dynamically updates
            while (selected.size() > 0) {
                int id = selected.get(0);
                adapter.removeImage(id);
                uploadViewModel.deleteImage(id);
            }
            dialog.dismiss();
        });
    }
}