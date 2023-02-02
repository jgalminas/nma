package com.example.nmadrawingapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.LiveData;
import android.app.AlertDialog;
import android.app.Dialog;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.widget.EditText;
import com.example.nmadrawingapp.databinding.ActivityMainBinding;
import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
import com.example.nmadrawingapp.model.repositories.ImageRepository;
import java.util.List;
import javax.inject.Inject;
import dagger.hilt.android.AndroidEntryPoint;

@AndroidEntryPoint
public class MainActivity extends AppCompatActivity {

    private ActivityMainBinding binding;
    private Dialog dialog;

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


        binding.btn.setOnClickListener(button -> {
            showDialog();
        });

    }

    private Dialog createDialog() {

        AlertDialog.Builder builder = new AlertDialog.Builder(this);

        LayoutInflater inflater = this.getLayoutInflater();

        builder.setView(inflater.inflate(R.layout.save_image_dialog, null));

        return builder.create();
    }

    private void showDialog() {

        dialog = createDialog();

        dialog.show(); // must show dialog before registering listeners

        // register on cancel listener
        dialog.findViewById(R.id.cancel_button).setOnClickListener(button -> {
            dialog.cancel();
        });

        // register on save listener
        dialog.findViewById(R.id.save_button).setOnClickListener(button -> {

            EditText ageInput = dialog.findViewById(R.id.age_input);

            imageRepository.insertImage(new Image(
                    Integer.parseInt(ageInput.getText().toString()),
                    binding.canvas.getImageBytes()
            ));

            binding.canvas.clearCanvas();
            dialog.dismiss();
        });

    }

}