package com.example.nmadrawingapp.model.data_sources.network;

import com.example.nmadrawingapp.model.data_sources.network.services.DrawingService;

import okhttp3.OkHttpClient;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitClient {

    private static final String URL = "http://192.168.0.18:5000/api/";
    private static RetrofitClient instance;
    private final DrawingService drawingService;

    public RetrofitClient() {
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(URL)
                .addConverterFactory(StringConverterFactory.create())
                .addConverterFactory(GsonConverterFactory.create())
                .client(new OkHttpClient())
                .build();

        drawingService = retrofit.create(DrawingService.class);
    }

    public static RetrofitClient getInstance(){
        if (instance == null) {
            instance = new RetrofitClient();
        }

        return instance;
    }

    public DrawingService getDrawingService() {
        return drawingService;
    }
}
