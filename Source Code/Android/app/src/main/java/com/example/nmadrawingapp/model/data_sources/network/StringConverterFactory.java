package com.example.nmadrawingapp.model.data_sources.network;

import androidx.annotation.NonNull;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;
import okhttp3.MediaType;
import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Converter;
import retrofit2.Retrofit;

public class StringConverterFactory extends Converter.Factory {

    private static final MediaType MEDIA_TYPE = MediaType.parse("text/plain");

    public static StringConverterFactory create() {
        return new StringConverterFactory();
    }

    @Override
    public Converter<ResponseBody, ?> responseBodyConverter(@NonNull Type type, @NonNull Annotation[] annotations, @NonNull Retrofit retrofit) {
        if (String.class.equals(type)) {
            return (Converter<ResponseBody, String>) ResponseBody::string;
        }
        return null;
    }

    @Override
    public Converter<?, RequestBody> requestBodyConverter(@NonNull Type type, @NonNull Annotation[] parameterAnnotations, @NonNull Annotation[] methodAnnotations, @NonNull Retrofit retrofit) {
        if(String.class.equals(type)) {
            return (Converter<String, RequestBody>) value -> RequestBody.create(MEDIA_TYPE, value);
        }

        return null;
    }

}
