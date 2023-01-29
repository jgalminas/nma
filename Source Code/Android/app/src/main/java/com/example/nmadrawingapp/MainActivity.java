package com.example.nmadrawingapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.LiveData;
import android.os.Bundle;
import android.widget.Button;
import com.example.nmadrawingapp.model.data_sources.db.Database;
import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
import java.util.List;
import java.util.UUID;

public class MainActivity extends AppCompatActivity {

    private Button button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        button = findViewById(R.id.btn);


        //region room read example

        LiveData<List<Image>> imageList = Database.getDatabase(this).imageDao().getAll();

        imageList.observe(this, images -> {
            button.setText(String.valueOf(images.size()));
        });

        //endregion

        //region room write example

        button.setOnClickListener(button -> {

            byte[] bytes = { 90, 20, 40, 10, 20, 40, 33 };
            Database.write.execute(() -> Database.getDatabase(this).imageDao().insert(new Image(UUID.randomUUID(), ".webp", bytes)));

        });

        //endregion

    }
}