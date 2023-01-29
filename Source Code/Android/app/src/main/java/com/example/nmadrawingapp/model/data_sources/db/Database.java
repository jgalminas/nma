package com.example.nmadrawingapp.model.data_sources.db;

import android.content.Context;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import com.example.nmadrawingapp.model.data_sources.db.daos.ImageDao;
import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@androidx.room.Database(entities = {Image.class}, version = 1, exportSchema = false)
public abstract class Database extends RoomDatabase {

    public abstract ImageDao imageDao();

    private static volatile Database database;
    private static final int NUM_OF_THREADS = 4;

    // executor for performing write operations
    public static final ExecutorService write = Executors.newFixedThreadPool(NUM_OF_THREADS);

    public static Database getDatabase(final Context context) {

        if (database == null) {
            synchronized (Database.class) {
                if (database == null) {
                    database = Room.databaseBuilder(context.getApplicationContext(), Database.class, "localdb").build();
                }
            }
        }

        return database;

    }

}
