package com.example.nmadrawingapp.view.adapters;

import static com.example.nmadrawingapp.view.UploadFragment.COLUMN_COUNT;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.example.nmadrawingapp.R;
import com.example.nmadrawingapp.model.DisplayImage;
import com.example.nmadrawingapp.model.Event;
import com.example.nmadrawingapp.model.Item;
import com.example.nmadrawingapp.model.enums.ItemType;
import com.example.nmadrawingapp.view.components.CustomCheckBox;

import java.util.ArrayList;
import java.util.List;

public class ImageAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private final int EVENT_TYPE = 0;
    private final int IMAGE_TYPE = 1;

    private List<Object> items = new ArrayList<>();
    private final MutableLiveData<ArrayList<Integer>> selected = new MutableLiveData<>(new ArrayList<>());

    public ImageAdapter(GridLayoutManager layoutManager) {

        // Make event items span full width
        layoutManager.setSpanSizeLookup(new GridLayoutManager.SpanSizeLookup() {
            @Override
            public int getSpanSize(int position) {
                if (((Item)items.get(position)).getType() == ItemType.Event) {
                    return COLUMN_COUNT;
                } else {
                    return 1;
                }
            }
        });

    }

    public static class ImageViewHolder extends RecyclerView.ViewHolder {

        private final ImageView imageView;
        private final CustomCheckBox checkBox;

        public ImageViewHolder(@NonNull View itemView) {
            super(itemView);

            imageView = itemView.findViewById(R.id.image);
            checkBox = itemView.findViewById(R.id.image_checkbox);
        }

        public ImageView getImageView() {
            return imageView;
        }

        public CustomCheckBox getCheckBox() {
            return checkBox;
        }

        public View getItemView() {
            return itemView;
        }

    }

    public static class EventViewHolder extends RecyclerView.ViewHolder {

        private final TextView eventId;
        private final TextView eventLabel;

        public EventViewHolder(@NonNull View itemView) {
            super(itemView);
            this.eventId = itemView.findViewById(R.id.event_id);
            this.eventLabel = itemView.findViewById(R.id.event_label);
        }

        private TextView getEventId() {
            return eventId;
        }

        private TextView getEventLabel() {
            return eventLabel;
        }
    }

    @Override
    public int getItemViewType(int position) {
        // based on you list you will return the ViewType
        if (((Item)items.get(position)).getType() == ItemType.Event) {
            return EVENT_TYPE;
        } else {
            return IMAGE_TYPE;
        }
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View view;

        if (viewType == EVENT_TYPE) {
            view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_event, parent, false);
            return new EventViewHolder(view);
        } else {
            view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_image, parent, false);
            return new ImageViewHolder(view);
        }

    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {

        final int type = getItemViewType(position);

        if (type == IMAGE_TYPE) {

            ImageViewHolder imageHolder = (ImageViewHolder) holder;

            DisplayImage image = (DisplayImage) items.get(position);

            // bind image
            imageHolder.getImageView().setImageBitmap(image.getImage());

            // bind checkbox value
            if (selected.getValue().contains(image.getId())) {
                imageHolder.getCheckBox().setChecked(true);
            } else {
                imageHolder.getCheckBox().setChecked(false);
            }

            // toggle checkbox when the checkbox is pressed
            imageHolder.getCheckBox().setOnClickListener(c -> {
                updateSelectedList(imageHolder, image);
            });

            // toggle checkbox when the card is pressed
            imageHolder.getItemView().setOnClickListener(iv -> {
                imageHolder.getCheckBox().toggle(); // update checkbox
                updateSelectedList(imageHolder, image); // update selected list
            });

        } else if (type == EVENT_TYPE) {

            EventViewHolder eventHolder = (EventViewHolder) holder;
            Event event = (Event) items.get(position);

            eventHolder.getEventId().setText(String.valueOf(event.getEventId()));

        }

    }

    public int getImageCount() {

        int count = 0;

        for (Object item : items) {
            if (((Item) item).getType() == ItemType.Image) {
                count ++;
            }
        }

        return count;
    }

    @Override
    public int getItemCount() {
        return items.size();
    }

    public void setImages(List<Object> items) {
        this.items = items;

        setToSelectedOnLoad(items); // select all images on load

        notifyDataSetChanged();
    }

    public LiveData<ArrayList<Integer>> getSelectedImages() {
        return selected;
    }

    private void setToSelectedOnLoad(List<Object> items) {
        ArrayList<Integer> selectedImages = new ArrayList<>();

        for (Object img : items) {
            if (img instanceof DisplayImage) {
                selectedImages.add(((DisplayImage) img).getId());
            }
        }

        selected.setValue(selectedImages);
    }

    private void updateSelectedList(ImageViewHolder holder, DisplayImage image) {
        if (holder.getCheckBox().isChecked()) {
            selected.getValue().add(image.getId());
            selected.setValue(selected.getValue());
        } else {
            selected.getValue().remove((Integer) image.getId());
            selected.setValue(selected.getValue());
        }
    }
}
