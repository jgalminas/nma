package com.example.nmadrawingapp.model.data_sources.db;

import androidx.room.RoomDatabase;
import com.example.nmadrawingapp.model.data_sources.db.daos.ImageDao;
import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@androidx.room.Database(entities = {Image.class}, version = 1, exportSchema = false)
public abstract class Database extends RoomDatabase {

    // private static volatile Database database;
    private static final int NUM_OF_THREADS = 4;
    // executor for performing write operations
    public static final ExecutorService executor = Executors.newFixedThreadPool(NUM_OF_THREADS);

    public abstract ImageDao imageDao();

}
