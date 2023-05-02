package com.example.nmadrawingapp.view.adapters;

import static com.example.nmadrawingapp.view.UploadFragment.COLUMN_COUNT;

import android.app.Dialog;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MenuInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.PopupMenu;
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
import com.example.nmadrawingapp.model.enums.Image;
import com.example.nmadrawingapp.model.enums.ItemType;
import com.example.nmadrawingapp.utils.NumberUtil;
import com.example.nmadrawingapp.view.components.CustomCheckBox;
import com.example.nmadrawingapp.viewmodel.UploadViewModel;

import java.util.ArrayList;
import java.util.List;

public class ImageAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private final int EVENT_TYPE = 0;
    private final int IMAGE_TYPE = 1;

    private List<Item> items = new ArrayList<>();
    private final MutableLiveData<ArrayList<Integer>> selected = new MutableLiveData<>(new ArrayList<>());
    private final Dialog dialog;
    private final UploadViewModel viewModel;

    public ImageAdapter(UploadViewModel viewModel, GridLayoutManager layoutManager, Dialog dialog) {

        this.viewModel = viewModel;
        this.dialog = dialog;

        // Make event items span full width
        layoutManager.setSpanSizeLookup(new GridLayoutManager.SpanSizeLookup() {
            @Override
            public int getSpanSize(int position) {
                if (items.get(position).getType() == ItemType.EVENT) {
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
        private final ConstraintLayout error;

        public ImageViewHolder(@NonNull View itemView) {
            super(itemView);

            imageView = itemView.findViewById(R.id.image);
            checkBox = itemView.findViewById(R.id.image_checkbox);
            spinner = itemView.findViewById(R.id.spinner);
            error = itemView.findViewById(R.id.img_error);
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

        public ConstraintLayout getError() {
            return error;
        }
    }

    public static class EventViewHolder extends RecyclerView.ViewHolder {

        private final TextView eventId;
        private final TextView eventLabel;
        private final ConstraintLayout error;
        private final ImageButton options;

        public EventViewHolder(@NonNull View itemView) {
            super(itemView);
            this.eventId = itemView.findViewById(R.id.event_id);
            this.eventLabel = itemView.findViewById(R.id.event_label);
            this.error = itemView.findViewById(R.id.id_error);
            this.options = itemView.findViewById(R.id.event_options);
        }

        public TextView getEventId() {
            return eventId;
        }

        public TextView getEventLabel() {
            return eventLabel;
        }

        public ConstraintLayout getError() {
            return error;
        }

        public ImageButton getOptions() {
            return options;
        }

    }

    @Override
    public int getItemViewType(int position) {
        // based on you list you will return the ViewType
        if (items.get(position).getType() == ItemType.EVENT) {
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

            // display event Id error
            if (event.isShowError()) {
                eventHolder.getError().setVisibility(View.VISIBLE);

                // handle on "Change ID" button click
                eventHolder.getError().findViewById(R.id.id_change_button).setOnClickListener(button -> {
                    showDialog(items.get(position));
                });

            } else {
                eventHolder.getError().setVisibility(View.GONE);
            }

            // inflate options menu
            eventHolder.getOptions().setOnClickListener(button -> {
                PopupMenu menu = new PopupMenu(button.getContext(), button, Gravity.END);
                MenuInflater inflater = menu.getMenuInflater();
                inflater.inflate(R.menu.event_options, menu.getMenu());
                menu.show();

                // menu item click handle
                menu.setOnMenuItemClickListener(item -> {
                    switch (item.getItemId()) {
                        case R.id.change_id:
                            showDialog(items.get(position));
                            return true;
                        default:
                            return false;
                    }
                });

            });

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

            // display system status
            if (image.getStatus() == Image.UPLOADING) {
                imageHolder.getSpinner().setVisibility(View.VISIBLE);
                imageHolder.getCheckBox().setVisibility(View.GONE);
                imageHolder.getError().setVisibility(View.GONE);
            }
            else if (image.getStatus() == Image.DEFAULT) {
                imageHolder.getSpinner().setVisibility(View.GONE);
                imageHolder.getCheckBox().setVisibility(View.VISIBLE);
            }
            else {
                imageHolder.getSpinner().setVisibility(View.GONE);
                imageHolder.getCheckBox().setVisibility(View.VISIBLE);
                imageHolder.getError().setVisibility(View.VISIBLE);
            }

        }

    }

    public int getImageCount() {

        int count = 0;

        for (com.example.nmadrawingapp.model.Item item : items) {
            if (item.getType() == ItemType.IMAGE) {
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
            if (img.getType() == ItemType.IMAGE) {
                selectedImages.add(img.toImage().getId());
            }
        }

        selected.setValue(selectedImages);
    }

    public void removeImage(int imageId) {
        for (int i = 0; i < items.size(); i++) {
            Item it = items.get(i);
            if (it.getType() == ItemType.IMAGE) {
                // find the image by id
                if (it.toImage().getId() == imageId) {
                    // check if its the last view in that event, if so remove the event view as well
                    if (items.get(i - 1).getType() == ItemType.EVENT && ((items.size() - 1 == i) || items.get(i + 1).getType() == ItemType.EVENT)) {
                        items.remove(it); // remove image
                        items.remove(i - 1); // remove event view343
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

    public void setImageLoadingStatus(int id, Image status) {

        DisplayImage image = getImageById(id);

        if (image != null) {

            int index = items.indexOf(image);
            image.setStatus(status);

            notifyItemChanged(index);

        }

    }

    private DisplayImage getImageById(int id) {

        for (Item i : items) {
            if (i.getType() == ItemType.IMAGE && i.getId() == id) {
                return i.toImage();
            }
        }

        return null;
    }

    private Event getEventById(int id) {

        for (com.example.nmadrawingapp.model.Item i : items) {
            if (i.getType() == ItemType.EVENT && i.getId() == id) {
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

    private void showDialog(Item item) {

        // make background transparent
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

        dialog.show(); // must show dialog before registering listeners

        EditText idInput = dialog.findViewById(R.id.event_id_input);

        // register on cancel listener
        dialog.findViewById(R.id.negative_button).setOnClickListener(button -> {
            dialog.cancel();
        });

        // register on submit listener
        dialog.findViewById(R.id.positive_button).setOnClickListener(button -> {

            int newId = NumberUtil.parseNumber(idInput.getText().toString());

            // if new ID is valid
            if (newId > 0 && idInput.getText().length() > 0) {

                // update IDs in SQLite
                viewModel.changeEventId(item.getId(), newId);

                // update IDs in the adapter's dataset
                updateEventIdsByEventId(item.getId(), newId);

                // update event ID in adapter's dataset & remove error
                item.toEvent().setId(newId);
                item.toEvent().setShowError(false);
                notifyItemChanged(items.indexOf(item));

                // close dialog
                dialog.cancel();

            }
            else {
                dialog.findViewById(R.id.error_message).setVisibility(View.VISIBLE);
            }

        });

        // validate input on text change
        idInput.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) { }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) { }

            @Override
            public void afterTextChanged(Editable text) {
                if (text.length() > 0) {
                    dialog.findViewById(R.id.error_message).setVisibility(View.GONE);
                } else {
                    dialog.findViewById(R.id.error_message).setVisibility(View.VISIBLE);
                }
            }
        });

    }

    private void updateEventIdsByEventId(int oldId, int newId) {

        for (Item i : items) {
            if (i.getType() == ItemType.IMAGE && i.toImage().getEventId() == oldId) {
                i.toImage().setEventId(newId);
            }
        }

    }

}
