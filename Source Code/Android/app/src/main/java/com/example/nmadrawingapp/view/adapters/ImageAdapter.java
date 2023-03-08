package com.example.nmadrawingapp.view.adapters;

import static com.example.nmadrawingapp.view.UploadFragment.COLUMN_COUNT;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintLayout;
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

    private List<Item> items = new ArrayList<>();
    private final MutableLiveData<ArrayList<Integer>> selected = new MutableLiveData<>(new ArrayList<>());

    public ImageAdapter(GridLayoutManager layoutManager) {

        // Make event items span full width
        layoutManager.setSpanSizeLookup(new GridLayoutManager.SpanSizeLookup() {
            @Override
            public int getSpanSize(int position) {
                if (items.get(position).getType() == ItemType.Event) {
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
        private final ProgressBar spinner;

        public ImageViewHolder(@NonNull View itemView) {
            super(itemView);

            imageView = itemView.findViewById(R.id.image);
            checkBox = itemView.findViewById(R.id.image_checkbox);
            spinner = itemView.findViewById(R.id.spinner);
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

        public ProgressBar getSpinner() {
            return spinner;
        }
    }

    public static class EventViewHolder extends RecyclerView.ViewHolder {

        private final TextView eventId;
        private final TextView eventLabel;
        private final TextView error;

        public EventViewHolder(@NonNull View itemView) {
            super(itemView);
            this.eventId = itemView.findViewById(R.id.event_id);
            this.eventLabel = itemView.findViewById(R.id.event_label);
            this.error = itemView.findViewById(R.id.id_error);
        }

        private TextView getEventId() {
            return eventId;
        }

        private TextView getEventLabel() {
            return eventLabel;
        }

        private TextView getError() {
            return error;
        }
    }

    @Override
    public int getItemViewType(int position) {
        // based on you list you will return the ViewType
        if (items.get(position).getType() == ItemType.Event) {
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

        if (type == EVENT_TYPE) {

            EventViewHolder eventHolder = (EventViewHolder) holder;
            Event event = items.get(position).toEvent();

            eventHolder.getEventId().setText(String.valueOf(event.getId()));

            if (event.isShowError()) {
                eventHolder.getError().setVisibility(View.VISIBLE);
            } else {
                eventHolder.getError().setVisibility(View.GONE);
            }

        } else if (type == IMAGE_TYPE) {

            ImageViewHolder imageHolder = (ImageViewHolder) holder;

            DisplayImage image = items.get(position).toImage();

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

            // loading spinner
            if (image.isUploading()) {
                imageHolder.getSpinner().setVisibility(View.VISIBLE);
                imageHolder.getCheckBox().setVisibility(View.GONE);
            } else {
                imageHolder.getSpinner().setVisibility(View.GONE);
                imageHolder.getCheckBox().setVisibility(View.VISIBLE);
            }

        }

    }

    public int getImageCount() {

        int count = 0;

        for (Item item : items) {
            if (item.getType() == ItemType.Image) {
                count ++;
            }
        }

        return count;
    }

    @Override
    public int getItemCount() {
        return items.size();
    }

    public void setImages(List<Item> items) {
        this.items = items;
        setToSelectedOnLoad(items); // select all images on load
        notifyDataSetChanged();
    }

    public LiveData<ArrayList<Integer>> getSelectedImages() {
        return selected;
    }

    private void setToSelectedOnLoad(List<Item> items) {
        ArrayList<Integer> selectedImages = new ArrayList<>();

        for (Item img : items) {
            if (img.getType() == ItemType.Image) {
                selectedImages.add(img.toImage().getId());
            }
        }

        selected.setValue(selectedImages);
    }

    public void removeImage(int imageId) {

        for (int i = 0; i < items.size(); i++) {

            Item it = items.get(i);

            if (it.getType() == ItemType.Image) {

                // find the image by id
                if (it.toImage().getId() == imageId) {

                    // check if its the last view in that event, if so remove the event view as well
                    if (items.get(i - 1).getType() == ItemType.Event && items.get(i + 1).getType() == ItemType.Event) {
                        items.remove(it); // remove image
                        items.remove(i - 1); // remove event view
                        notifyItemRangeRemoved(i - 1, 2); // update recycler view
                    } else {
                        items.remove(it); // remove just image
                        notifyItemRemoved(i); // update recycler
                    }

                    removeFromSelected(imageId); // update the selected item list

                }

            }
        }

    }

    private void removeFromSelected(int imageId) {

        for (int i = 0; i < selected.getValue().size(); i++) {

            if (selected.getValue().get(i) == imageId) {
                ArrayList<Integer> list = selected.getValue();
                list.remove(i);
                selected.setValue(list);
            }

        }

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

    public void setImageLoadingStatus(int id, boolean bool) {

        DisplayImage image = getImageById(id);

        if (image != null) {

            int index = items.indexOf(image);
            image.setUploading(bool);

            notifyItemChanged(index);

        }

    }

    private DisplayImage getImageById(int id) {

        for (Item i : items) {
            if (i.getType() == ItemType.Image && i.getId() == id) {
                return i.toImage();
            }
        }

        return null;
    }

    private Event getEventById(int id) {

        for (Item i : items) {
            if (i.getType() == ItemType.Event && i.getId() == id) {
                return i.toEvent();
            }
        }

        return null;
    }

    public void showEventError(int imageId, boolean bool) {

        DisplayImage image = getImageById(imageId);

        if (image != null) {

            Event event = getEventById(image.getEventId());

            if (event != null) {
                event.setShowError(bool);
                notifyDataSetChanged();
            }
        }

    }
}
