package com.example.nmadrawingapp.model.data_sources.network;

import com.example.nmadrawingapp.model.data_sources.network.services.DrawingService;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitClient {

    private static final String URL = "http://192.168.0.18:5000/api/";
    private static RetrofitClient instance;
    private final DrawingService drawingService;

    public RetrofitClient() {

        OkHttpClient client = new OkHttpClient.Builder()
                .connectTimeout(60, TimeUnit.SECONDS)
                .readTimeout(60, TimeUnit.SECONDS)
                .addInterceptor(chain -> {
                    Request.Builder requestBuilder = chain.request().newBuilder();
                    requestBuilder.header("x-api-key", "android_drawing_app:NT3NYx0HLcFE4r5hwntRH3NnuJKkM0Xl6I5jmIn70BIRl17i1A83K4WdA67qBNws");
                    return chain.proceed(requestBuilder.build());
                })
                .build();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(URL)
                .addConverterFactory(StringConverterFactory.create())
                .addConverterFactory(GsonConverterFactory.create())
                .client(client)
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
