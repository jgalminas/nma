package com.example.nmadrawingapp.utils;

import android.content.Context;
import android.widget.Toast;

public class SafeToast {
    private static Toast toast; // One toast object for all application toasts. Stops stacking

    public static void makeText(Context context, String text, int length) {
        if (toast != null) {
            toast.cancel();
        }
        toast = Toast.makeText(context, text, length);
        toast.show();
    }
}
