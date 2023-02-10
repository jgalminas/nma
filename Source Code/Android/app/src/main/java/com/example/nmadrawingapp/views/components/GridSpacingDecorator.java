package com.example.nmadrawingapp.views.components;

import android.graphics.Rect;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class GridSpacingDecorator extends RecyclerView.ItemDecoration {

    private final int columnCount;
    private final int gap;

    public GridSpacingDecorator(int columnCount, int gap) {
        this.columnCount = columnCount;
        this.gap = gap;
    }

    @Override
    public void getItemOffsets(@NonNull Rect outRect, @NonNull View view, @NonNull RecyclerView parent, @NonNull RecyclerView.State state) {

        int position = parent.getChildAdapterPosition(view);
        int column = position % columnCount;

        outRect.left = gap - column * gap / columnCount;
        outRect.right = (column + 1) * gap / columnCount;

        if (position < columnCount) {
            outRect.top = gap;
        }

        outRect.bottom = gap;
    }
}
