package com.example.nmadrawingapp.model.data_sources.network.services;

import okhttp3.MultipartBody;
import retrofit2.Call;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;

public interface DrawingService {

    @Multipart
    @POST("drawing")
    Call<Void> postDrawing(
            @Part("EventId") int eventId,
            @Part MultipartBody.Part file,
            @Part("DrawersName") String drawersName,
            @Part("DrawersAge") int drawersAge);

}
