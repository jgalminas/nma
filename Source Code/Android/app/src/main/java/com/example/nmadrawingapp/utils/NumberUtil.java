package com.example.nmadrawingapp.utils;

public class NumberUtil {

    public static int parseNumber(String text) {
        try {
            return Integer.parseInt(text);
        } catch (NumberFormatException e) {
            return -1;
        }
    }
}
