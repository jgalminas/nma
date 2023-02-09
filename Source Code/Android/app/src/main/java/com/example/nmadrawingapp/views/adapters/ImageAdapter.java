package com.example.nmadrawingapp.views.adapters;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.ImageView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.example.nmadrawingapp.R;
import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
import com.example.nmadrawingapp.views.components.RoundCheckBox;

import java.util.ArrayList;
import java.util.List;

public class ImageAdapter extends RecyclerView.Adapter<ImageAdapter.ViewHolder> {

    private List<Bitmap> images = new ArrayList<>();

    public static class ViewHolder extends RecyclerView.ViewHolder {

        private final ImageView imageView;
        private final RoundCheckBox checkBox;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            imageView = itemView.findViewById(R.id.image);

            checkBox = itemView.findViewById(R.id.checkbox);
            checkBox.setChecked(true); // checked by default

            // toggle checkbox by clicking on the card itself
            itemView.setOnClickListener(v -> {
                checkBox.toggle();
            });

        }

        public ImageView getImageView() {
            return imageView;
        }

    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.image_item, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.getImageView().setImageBitmap(images.get(position));
    }

    @Override
    public int getItemCount() {
        return images.size();
    }

    public void setImages(List<Bitmap> images) {
        this.images = images;
        notifyDataSetChanged();
    }

}
