package com.example.nmadrawingapp.di;

import com.example.nmadrawingapp.model.data_sources.db.daos.ImageDao;
import com.example.nmadrawingapp.model.repositories.IImageRepository;
import com.example.nmadrawingapp.model.repositories.ImageRepository;
import javax.inject.Singleton;
import dagger.Module;
import dagger.Provides;
import dagger.hilt.InstallIn;
import dagger.hilt.components.SingletonComponent;

@Module
@InstallIn(SingletonComponent.class)
final class AppModule {

    @Provides
    @Singleton
    public static IImageRepository provideImageRepository(ImageDao imageDao) {
        return new ImageRepository(imageDao);
    }

}
