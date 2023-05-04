package com.example.nmadrawingapp;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import android.widget.RadioGroup;

import androidx.core.content.ContextCompat;

import com.example.nmadrawingapp.view.DrawingFragment;
import com.example.nmadrawingapp.view.StartFragment;
import com.example.nmadrawingapp.view.components.CanvasView;

import org.junit.Test;

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
// These tests can run without an emulator/device
public class MainActivityUnitTests {


    @Test
    public void checkAgeValidation() {
        DrawingFragment drawingFragment = new DrawingFragment();
        boolean result = drawingFragment.validateAge(-1) && drawingFragment.validateAge(200);
        assertFalse(result);
        assertTrue(drawingFragment.validateAge(5));
    }

    @Test
    public void checkNameValidation() {
        DrawingFragment drawingFragment = new DrawingFragment();
        String[] invalidStrings = {"", " ", "1234", " foo bar"};
        for (String name : invalidStrings) {
            assertFalse(drawingFragment.validateName(name));
        }
        assertTrue(drawingFragment.validateName("Frank")); // Valid input
    }

    @Test
    public void checkEventIDValidation() {
        StartFragment startFragment = new StartFragment();
        String[] invalidStrings = {" ", "", "-10", "a12"};
        for (String id : invalidStrings) {
            assertFalse(startFragment.isEventIdValid(id));
        }
        assertTrue(startFragment.isEventIdValid("1"));
    }
}