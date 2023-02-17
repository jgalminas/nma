package com.example.nmadrawingapp.view.adapters;

import static com.example.nmadrawingapp.view.UploadFragment.COLUMN_COUNT;
import static com.example.nmadrawingapp.view.UploadFragment.GAP;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.example.nmadrawingapp.R;
import com.example.nmadrawingapp.model.Event;
import com.example.nmadrawingapp.view.components.GridSpacingDecorator;

import java.util.ArrayList;
import java.util.List;

public class EventAdapter extends RecyclerView.Adapter<EventAdapter.ViewHolder> {

    private List<Event> events = new ArrayList<>();

    public static class ViewHolder extends RecyclerView.ViewHolder {

        private final TextView eventId;
        private final RecyclerView grid;
        private final View itemView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            this.eventId = itemView.findViewById(R.id.event_id);
            this.grid = itemView.findViewById(R.id.images_grid);
            this.itemView = itemView;
        }

        private TextView getEventId() {
            return eventId;
        }

        private RecyclerView getGrid() {
            return grid;
        }

        private View getItemView() {
            return itemView;
        }

    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_event, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {

        ImageAdapter adapter = new ImageAdapter();
        RecyclerView.LayoutManager layoutManager = new GridLayoutManager(holder.getItemView().getContext(), COLUMN_COUNT);
        GridSpacingDecorator separator = new GridSpacingDecorator(COLUMN_COUNT, GAP);

        holder.getGrid().setLayoutManager(layoutManager);
        holder.getGrid().setItemAnimator(new DefaultItemAnimator());
        holder.getGrid().setAdapter(adapter);
        holder.getGrid().addItemDecoration(separator);

        adapter.setImages(events.get(position).getImages());

        holder.getEventId().setText(String.valueOf(events.get(position).getEventId()));
    }

    @Override
    public int getItemCount() {
        return events.size();
    }

    public void setEvents(List<Event> events) {
        this.events = events;
        notifyDataSetChanged();
    }

}
