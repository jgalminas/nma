package com.example.nmadrawingapp.view.components;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.Checkable;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

public class CustomCheckBox extends androidx.appcompat.widget.AppCompatImageView implements Checkable {

    private boolean isChecked;

    private static final int[] CHECKED_STATE_SET = {
            android.R.attr.state_checked
    };

    public CustomCheckBox(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    public void setChecked(boolean bool) {
        isChecked = bool;
        refreshDrawableState();
    }

    @Override
    public boolean isChecked() {
        return isChecked;
    }

    @Override
    public void toggle() {
        isChecked = !isChecked;
        refreshDrawableState();
    }

    @Override
    public int[] onCreateDrawableState(int extraSpace) {
        final int[] drawableState = super.onCreateDrawableState(extraSpace + 1);
        if (isChecked()) {
            mergeDrawableStates(drawableState, CHECKED_STATE_SET);
        }
        return drawableState;
    }

    @Override
    public boolean performClick() {
        toggle();
        return super.performClick();
    }
}
