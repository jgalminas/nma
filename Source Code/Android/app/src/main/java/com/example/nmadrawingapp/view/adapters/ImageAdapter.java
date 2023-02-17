package com.example.nmadrawingapp.view.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.recyclerview.widget.RecyclerView;
import com.example.nmadrawingapp.R;
import com.example.nmadrawingapp.model.DisplayImage;
import com.example.nmadrawingapp.view.components.RoundCheckBox;
import java.util.ArrayList;
import java.util.List;

public class ImageAdapter extends RecyclerView.Adapter<ImageAdapter.ViewHolder> {

    private List<DisplayImage> images = new ArrayList<>();
    private final MutableLiveData<ArrayList<Integer>> selected = new MutableLiveData<>(new ArrayList<>());

    public static class ViewHolder extends RecyclerView.ViewHolder {

        private final ImageView imageView;
        private final RoundCheckBox checkBox;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            imageView = itemView.findViewById(R.id.image);
            checkBox = itemView.findViewById(R.id.checkbox);
        }

        public ImageView getImageView() {
            return imageView;
        }

        public RoundCheckBox getCheckBox() {
            return checkBox;
        }

        public View getItemView() {
            return itemView;
        }

    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_image, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {

        // bind image
        holder.getImageView().setImageBitmap(images.get(position).getImage());

        DisplayImage image = images.get(position);

        // bind checkbox value
        if (selected.getValue().contains(image.getId())) {
            holder.getCheckBox().setChecked(true);
        } else {
            holder.getCheckBox().setChecked(false);
        }

        // toggle checkbox when the checkbox is pressed
        holder.getCheckBox().setOnClickListener(c -> {
            updateSelectedList(holder, image);
        });

        // toggle checkbox when the card is pressed
        holder.getItemView().setOnClickListener(iv -> {
            holder.getCheckBox().toggle(); // update checkbox
            updateSelectedList(holder, image); // update selected list
        });

    }

    @Override
    public int getItemCount() {
        return images.size();
    }

    public void setImages(List<DisplayImage> images) {
        this.images = images;

        setToSelectedOnLoad(images); // select all images on load

        notifyDataSetChanged();
    }

    public LiveData<ArrayList<Integer>> getSelectedImages() {
        return selected;
    }

    private void setToSelectedOnLoad(List<DisplayImage> images) {
        ArrayList<Integer> selectedImages = new ArrayList<>();

        for (DisplayImage img : images) {
            selectedImages.add(img.getId());
        }

        selected.setValue(selectedImages);
    }

    private void updateSelectedList(ViewHolder holder, DisplayImage image) {
        if (holder.getCheckBox().isChecked()) {
            selected.getValue().add(image.getId());
            selected.setValue(selected.getValue());
        } else {
            selected.getValue().remove((Integer) image.getId());
            selected.setValue(selected.getValue());
        }
    }
}
