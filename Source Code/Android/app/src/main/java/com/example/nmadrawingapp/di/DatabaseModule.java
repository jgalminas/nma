package com.example.nmadrawingapp.di;

import android.content.Context;
import androidx.room.Room;
import com.example.nmadrawingapp.model.data_sources.db.Database;
import com.example.nmadrawingapp.model.data_sources.db.daos.ImageDao;
import javax.inject.Singleton;
import dagger.Module;
import dagger.Provides;
import dagger.hilt.InstallIn;
import dagger.hilt.android.qualifiers.ApplicationContext;
import dagger.hilt.components.SingletonComponent;

@InstallIn(SingletonComponent.class)
@Module
final class DatabaseModule {

    @Singleton
    @Provides
    public static Database provideDatabase(@ApplicationContext Context app) {
        return Room.databaseBuilder(app, Database.class, "localdb").build();
    }

    @Singleton
    @Provides
    public static ImageDao provideImageDao(Database db) {
        return db.imageDao();
    }
}