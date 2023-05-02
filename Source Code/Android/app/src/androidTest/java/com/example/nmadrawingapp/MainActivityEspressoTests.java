package com.example.nmadrawingapp;


import static androidx.test.espresso.Espresso.onView;
import static androidx.test.espresso.Espresso.pressBack;
import static androidx.test.espresso.action.ViewActions.actionWithAssertions;
import static androidx.test.espresso.action.ViewActions.click;
import static androidx.test.espresso.action.ViewActions.closeSoftKeyboard;
import static androidx.test.espresso.action.ViewActions.replaceText;
import static androidx.test.espresso.assertion.ViewAssertions.matches;
import static androidx.test.espresso.matcher.ViewMatchers.isDisplayed;
import static androidx.test.espresso.matcher.ViewMatchers.withClassName;
import static androidx.test.espresso.matcher.ViewMatchers.withContentDescription;
import static androidx.test.espresso.matcher.ViewMatchers.withId;
import static androidx.test.espresso.matcher.ViewMatchers.withParent;
import static androidx.test.espresso.matcher.ViewMatchers.withText;
import static org.hamcrest.Matchers.allOf;
import static org.hamcrest.Matchers.is;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Paint;
import android.os.SystemClock;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewParent;

import androidx.core.content.ContextCompat;
import androidx.test.espresso.UiController;
import androidx.test.espresso.ViewAction;
import androidx.test.espresso.ViewInteraction;
import androidx.test.espresso.matcher.ViewMatchers;
import androidx.test.ext.junit.rules.ActivityScenarioRule;
import androidx.test.filters.LargeTest;
import androidx.test.platform.app.InstrumentationRegistry;

import com.example.nmadrawingapp.view.components.CanvasView;

import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;
import org.hamcrest.core.IsInstanceOf;
import org.junit.Rule;
import org.junit.Test;

import java.util.ArrayList;

// These tests require an emulator/device
@LargeTest
public class MainActivityEspressoTests { // Test all canvas functionality. Simulates user interaction.

    @Rule
    public ActivityScenarioRule<MainActivity> mActivityScenarioRule =
            new ActivityScenarioRule<>(MainActivity.class);

    public void startEvent() { // Join event (code 0) and start the canvas
        ViewInteraction appCompatEditText = onView(
                allOf(withId(R.id.event_input),
                        childAtPosition(
                                childAtPosition(
                                        withClassName(is("android.widget.FrameLayout")),
                                        0),
                                3),
                        isDisplayed()));
        appCompatEditText.perform(replaceText("0"), closeSoftKeyboard());
        ViewInteraction appCompatButton = onView(
                allOf(withId(R.id.start_button), withText("Start"),
                        childAtPosition(
                                childAtPosition(
                                        withClassName(is("android.widget.FrameLayout")),
                                        0),
                                4),
                        isDisplayed()));
        appCompatButton.perform(click());
    }

    @Test
    public void openCanvas() {
        startEvent();
        ViewInteraction canvas = onView(withId(R.id.canvas));
        canvas.check(matches(isDisplayed()));
    }
    public void drawLine(View view) {
        CanvasView customDrawView = (CanvasView) view;
        int metaState = 0;
        long downTime = SystemClock.uptimeMillis();
        long eventTime = SystemClock.uptimeMillis();
        int action = MotionEvent.ACTION_DOWN;
        int x = 50;
        int y = 50;

        // dispatch the event
        MotionEvent event = MotionEvent.obtain(downTime, eventTime, action, x, y, metaState);
        customDrawView.onTouchEvent(event);

        long downTime2 = SystemClock.uptimeMillis();
        long eventTime2 = SystemClock.uptimeMillis();
        int action2 = MotionEvent.ACTION_MOVE;
        int x2 = 110;
        int y2 = 110;

        // dispatch the event
        MotionEvent event2 = MotionEvent.obtain(downTime2, eventTime2, action2, x2, y2, metaState);
        customDrawView.onTouchEvent(event2);

        int action3 = MotionEvent.ACTION_UP;

        // dispatch the event
        MotionEvent event3 = MotionEvent.obtain(downTime2, eventTime2, action3, x2, y2, metaState);
        customDrawView.onTouchEvent(event3);
    }

    @Test
    public void blankInput() {
        ViewInteraction appCompatButton = onView(
                allOf(withId(R.id.start_button), withText("Start"),
                        childAtPosition(
                                childAtPosition(
                                        withClassName(is("android.widget.FrameLayout")),
                                        0),
                                4),
                        isDisplayed()));
        appCompatButton.perform(click());

        ViewInteraction textView = onView(
                allOf(withId(R.id.start_error_message), withText("Event code input can't be empty"),
                        withParent(withParent(IsInstanceOf.<View>instanceOf(android.widget.FrameLayout.class))),
                        isDisplayed()));
        textView.check(matches(isDisplayed()));
    }

    @Test
    public void invalidSelection() {
        ViewInteraction appCompatButton3 = onView(
                allOf(withId(R.id.start_upload_button), withText("Upload"),
                        childAtPosition(
                                childAtPosition(
                                        withClassName(is("android.widget.FrameLayout")),
                                        0),
                                10),
                        isDisplayed()));
        appCompatButton3.perform(click());
        ViewInteraction appCompatImageButton = onView(
                allOf(withId(R.id.delete_button), withContentDescription("Delete selected drawings"),
                        childAtPosition(
                                allOf(withId(R.id.header),
                                        childAtPosition(
                                                withClassName(is("androidx.constraintlayout.widget.ConstraintLayout")),
                                                0)),
                                2),
                        isDisplayed()));
        appCompatImageButton.perform(click());
        ViewInteraction materialButton2 = onView(withId(R.id.positive_button));
        materialButton2.perform(click());
    }

    @Test
    public void drawingTest() {
        startEvent();
        onView(withId(R.id.canvas))
                .perform(actionWithAssertions(new ViewAction() {
                    @Override
                    public Matcher<View> getConstraints() {
                        return ViewMatchers.isAssignableFrom(CanvasView.class);
                    }

                    @Override
                    public String getDescription() {
                        return "Perform drawing actions on CustomDrawView";
                    }

                    @Override
                    public void perform(UiController uiController, View view) { // Draw a line
                        drawLine(view);
                    }
                }))
                .check(matches(new CanvasEmptyMatcher())); // Check if line created
    }

    private class CanvasEmptyMatcher extends TypeSafeMatcher<View> {

        @Override
        protected boolean matchesSafely(View view) { // Check canvas content manually. Slower but accounts for error
            byte[] bytes = ((CanvasView) view).getImageBytes();
            BitmapFactory.Options options = new BitmapFactory.Options();
            options.inMutable = true;
            Bitmap canvasBitmap = BitmapFactory.decodeByteArray(bytes, 0, bytes.length, options);
            Bitmap emptyBitmap = Bitmap.createBitmap(canvasBitmap.getWidth(), canvasBitmap.getHeight(), canvasBitmap.getConfig());
            if (canvasBitmap.sameAs(emptyBitmap)) {
                return true;
            }
            return false;
        }

        @Override
        public void describeTo(Description description) {
            description.appendText("an empty canvas");
        }
    }

    @Test
    public void strokeChange() { // Test all strokes. Warning: Strokes may be hidden on small displays. Test will fail.
        class Stroke
        {
            public float width;
            public int id;
            Stroke(int ID, float Width) {
                id = ID;
                width = Width;
            }
        }
        startEvent();
        ArrayList<Stroke> strokes = new ArrayList<>();
        strokes.add(new Stroke( R.id.radioButtonThinnestStroke, 3));
        strokes.add(new Stroke( R.id.radioButtonThinStroke, 6));
        strokes.add(new Stroke( R.id.radioButtonMediumStroke, 9));
        strokes.add(new Stroke( R.id.radioButtonThickStroke, 12));
        strokes.add(new Stroke( R.id.radioButtonThickestStroke, 15));
        for (Stroke s : strokes) {
            System.out.println(s.id);
            ViewInteraction strokeButton = onView(withId(s.id));
            strokeButton.perform(click());
            ViewInteraction canvasView = onView(withId(R.id.canvas));
            canvasView.check(matches(new strokeChangedMatcher(s.width))); // Check if width was changed
        }
    }

    private  class strokeChangedMatcher extends TypeSafeMatcher<View> {
        float width;
        @Override
        protected boolean matchesSafely(View view) {
            CanvasView.BrushSettings brushSettings = ((CanvasView) view).getBrushSettings();
            float currentWidth  = brushSettings.getWidth();
            return currentWidth == width;
        }

        @Override
        public void describeTo(Description description) {
            description.appendText("colour matcher");
        }
        strokeChangedMatcher(float Width) {
            width = Width;
        }
    }

    @Test
    public void deleteImage() {
        submitDrawing();
        ViewInteraction recyclerView = onView(
                allOf(withId(R.id.images_recycler),
                        childAtPosition(
                                withClassName(is("androidx.constraintlayout.widget.ConstraintLayout")),
                                1)));
        recyclerView.check(matches(isDisplayed()));
        ViewInteraction appCompatImageButton = onView(
                allOf(withId(R.id.delete_button), withContentDescription("Delete selected drawings"),
                        childAtPosition(
                                allOf(withId(R.id.header),
                                        childAtPosition(
                                                withClassName(is("androidx.constraintlayout.widget.ConstraintLayout")),
                                                0)),
                                2),
                        isDisplayed()));
        appCompatImageButton.perform(click());
        ViewInteraction materialButton2 = onView(withId(R.id.positive_button));
        materialButton2.perform(click());
        recyclerView.check(matches(isDisplayed()));
    }

    @Test
    public void toolChange() {
        startEvent();
        ViewInteraction materialRadioButton = onView(
                allOf(withId(R.id.radioButtonFillDraw),
                        childAtPosition(
                                allOf(withId(R.id.radioGroupDrawTypeSelection),
                                        childAtPosition(
                                                withId(R.id.drawing_header),
                                                1)),
                                1),
                        isDisplayed()));
        materialRadioButton.perform(click());
        ViewInteraction canvasView = onView(withId(R.id.canvas));
        canvasView.check(matches(new toolChangedMatcher())); // Check if colour was changed to red
    }

    private  class toolChangedMatcher extends TypeSafeMatcher<View> {

        @Override
        protected boolean matchesSafely(View view) {
            CanvasView.BrushSettings brushSettings = ((CanvasView) view).getBrushSettings();
            Paint.Style currentStyle  = brushSettings.getStyle();
            return currentStyle == Paint.Style.FILL;
        }

        @Override
        public void describeTo(Description description) {
            description.appendText("colour matcher");
        }
    }

        @Test
    public void colourChange() { // Only one colour needed as they all share the same logic
        startEvent();
        ViewInteraction materialRadioButton = onView(
                allOf(withId(R.id.radioButtonRed),
                        childAtPosition(
                                allOf(withId(R.id.radioGroupColorSelector),
                                        childAtPosition(
                                                withClassName(is("androidx.constraintlayout.widget.ConstraintLayout")),
                                                2)),
                                0),
                        isDisplayed()));
        materialRadioButton.perform(click());
        ViewInteraction canvasView = onView(withId(R.id.canvas));
        canvasView.check(matches(new colourChangedMatcher())); // Check if colour was changed to red
    }

    private class colourChangedMatcher extends TypeSafeMatcher<View> {

        @Override
        protected boolean matchesSafely(View view) {
            CanvasView.BrushSettings brushSettings = ((CanvasView) view).getBrushSettings();
            int currentColour  = brushSettings.getColor();
            int sRGBColour = ContextCompat.getColor(InstrumentationRegistry.getInstrumentation().getTargetContext(), R.color.red);
            return currentColour == sRGBColour;
        }

        @Override
        public void describeTo(Description description) {
            description.appendText("colour matcher");
        }
    }

    @Test
    public void submitDrawing() {
        startEvent();
        ViewInteraction appCompatButton2 = onView(
                allOf(withId(R.id.save_drawing_button), withText("Save Your Drawing"),
                        childAtPosition(
                                allOf(withId(R.id.drawing_header),
                                        childAtPosition(
                                                withClassName(is("androidx.constraintlayout.widget.ConstraintLayout")),
                                                0)),
                                0),
                        isDisplayed()));
        appCompatButton2.perform(click());

        ViewInteraction appCompatEditText2 = onView(
                allOf(withId(R.id.age_input),
                        childAtPosition(
                                childAtPosition(
                                        withId(android.R.id.custom),
                                        0),
                                6),
                        isDisplayed()));
        appCompatEditText2.perform(replaceText("1"), closeSoftKeyboard());

        ViewInteraction appCompatEditText3 = onView(
                allOf(withId(R.id.name_input),
                        childAtPosition(
                                childAtPosition(
                                        withId(android.R.id.custom),
                                        0),
                                4),
                        isDisplayed()));
        appCompatEditText3.perform(replaceText("Frank"), closeSoftKeyboard());

        ViewInteraction materialButton = onView(
                allOf(withId(R.id.save_button), withText("Save"),
                        childAtPosition(
                                childAtPosition(
                                        withId(android.R.id.custom),
                                        0),
                                7),
                        isDisplayed()));
        materialButton.perform(click());
        pressBack(); // Return to home
        ViewInteraction appCompatButton3 = onView(
                allOf(withId(R.id.start_upload_button), withText("Upload"),
                        childAtPosition(
                                childAtPosition(
                                        withClassName(is("android.widget.FrameLayout")),
                                        0),
                                10),
                        isDisplayed()));
        appCompatButton3.perform(click());
        ViewInteraction recyclerView = onView(
                allOf(withId(R.id.images_recycler),
                        childAtPosition(
                                withClassName(is("androidx.constraintlayout.widget.ConstraintLayout")),
                                1)));
        recyclerView.check(matches(isDisplayed()));
    }
    private static Matcher<View> childAtPosition(
            final Matcher<View> parentMatcher, final int position) {

        return new TypeSafeMatcher<View>() {
            @Override
            public void describeTo(Description description) {
                description.appendText("Child at position " + position + " in parent ");
                parentMatcher.describeTo(description);
            }

            @Override
            public boolean matchesSafely(View view) {
                ViewParent parent = view.getParent();
                return parent instanceof ViewGroup && parentMatcher.matches(parent)
                        && view.equals(((ViewGroup) parent).getChildAt(position));
            }
        };
    }
}
