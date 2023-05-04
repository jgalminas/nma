package com.example.nmadrawingapp.view;

import android.app.AlertDialog;
import android.app.Dialog;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;

import com.example.nmadrawingapp.R;
import com.example.nmadrawingapp.databinding.FragmentDrawingBinding;
import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
import com.example.nmadrawingapp.model.repositories.ImageRepository;
import com.example.nmadrawingapp.utils.NumberUtil;
import com.example.nmadrawingapp.utils.SafeToast;
import com.example.nmadrawingapp.viewmodel.SharedViewModel;
import javax.inject.Inject;
import dagger.hilt.android.AndroidEntryPoint;


@AndroidEntryPoint
public class DrawingFragment extends Fragment {

    private SharedViewModel sharedViewModel;
    private FragmentDrawingBinding binding;

    private Dialog dialog;

    public RadioGroup colorSelection;
    private RadioGroup drawTypeSelection;
    private RadioGroup strokeWidthSelection;

    private int selectedDrawingTool = R.id.radioButtonLineDraw; // Start tool



    @Inject
    ImageRepository imageRepository; // for testing purposes

    public DrawingFragment() {
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        sharedViewModel = new ViewModelProvider(requireActivity()).get(SharedViewModel.class);



    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        binding = FragmentDrawingBinding.inflate(inflater, container, false);
        return binding.getRoot();
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        binding.saveDrawingButton.setOnClickListener(button -> {
            if (binding.canvas.canvasHasContent()) {
                showDialog();
            } else {
                SafeToast.makeText(getContext(), "Draw something first!", Toast.LENGTH_SHORT);
            }
        });

        colorSelection = (RadioGroup) getView().findViewById(R.id.radioGroupColorSelector);
        colorSelection.check(R.id.radioButtonBlack);


        colorSelection.setOnCheckedChangeListener((radioGroup, id) -> {
            if (drawTypeSelection.getCheckedRadioButtonId() == R.id.radioButtonEraser) {
                drawTypeSelection.check(selectedDrawingTool); // Set to previous tool
            } else { // Called by tool change
                setToolColourToSelection();
            }
        });

        drawTypeSelection = (RadioGroup) getView().findViewById(R.id.radioGroupDrawTypeSelection);
        drawTypeSelection.check(selectedDrawingTool);
        drawTypeSelection.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup radioGroup, int i) {
                switch (i){
                    case R.id.radioButtonLineDraw:
                        binding.canvas.setStyleStroke();
                        setToolColourToSelection();
                        selectedDrawingTool = i;
                        break;
                    case R.id.radioButtonFillDraw:
                        binding.canvas.setStyleFill();
                        setToolColourToSelection();
                        selectedDrawingTool = i;
                        break;
                    case R.id.radioButtonEraser:
                        binding.canvas.setStyleStroke();
                        binding.canvas.getBrushSettings().setColor(getResources().getColor(R.color.white));
                        break;
                }
            }
        });

        strokeWidthSelection = (RadioGroup) getView().findViewById((R.id.radioGroupStrokeSelection));
        strokeWidthSelection.check(R.id.radioButtonMediumStroke);
        binding.canvas.getBrushSettings().setWidth(9);
        strokeWidthSelection.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup radioGroup, int i) {
                switch (i){
                    case R.id.radioButtonThinnestStroke:
                        binding.canvas.getBrushSettings().setWidth(3);
                        break;
                    case R.id.radioButtonThinStroke:
                        binding.canvas.getBrushSettings().setWidth(6);
                        break;
                    case R.id.radioButtonMediumStroke:
                        binding.canvas.getBrushSettings().setWidth(9);
                        break;
                    case R.id.radioButtonThickStroke:
                        binding.canvas.getBrushSettings().setWidth(12);
                        break;
                    case R.id.radioButtonThickestStroke:
                        binding.canvas.getBrushSettings().setWidth(15);
                        break;
                    default:
                        return;
                }
                if (drawTypeSelection.getCheckedRadioButtonId() != R.id.radioButtonEraser){
                    drawTypeSelection.check(R.id.radioButtonLineDraw);
                }
            }
        });
    }

    private Dialog createDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(requireContext());
        LayoutInflater inflater = this.getLayoutInflater();
        builder.setView(inflater.inflate(R.layout.dialog_image_save, null));
        return builder.create();
    }

    private void showDialog() {

        dialog = createDialog();

        // make background transparent
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

        dialog.show(); // must show dialog before registering listeners

        EditText ageInput = dialog.findViewById(R.id.age_input);
        EditText nameInput = dialog.findViewById(R.id.name_input);

        

        // register on cancel listener
        dialog.findViewById(R.id.cancel_button).setOnClickListener(button -> {
            dialog.dismiss();
        });

        // register on save listener
        dialog.findViewById(R.id.save_button).setOnClickListener(button -> {
            int age = NumberUtil.parseNumber(ageInput.getText().toString());
            String name = nameInput.getText().toString();

            if (!validateAge(age)) {
                dialog.findViewById(R.id.age_error_message).setVisibility(View.VISIBLE);
                return;
            }
            if (!validateName(name)) {
                dialog.findViewById(R.id.name_error_message).setVisibility(View.VISIBLE);
                return;
            }

            imageRepository.insertImage(new Image(
                    sharedViewModel.getEventId(),
                    name,
                    age,
                    binding.canvas.getImageBytes()
            ));
            binding.canvas.clearCanvas();
            binding.canvas.setStyleStroke();
            colorSelection.check(R.id.radioButtonBlack);
            strokeWidthSelection.check(R.id.radioButtonMediumStroke);
            dialog.dismiss();
            SafeToast.makeText(getContext(), "Drawing Saved", Toast.LENGTH_SHORT);
        });

        // validate age input on text change
        ageInput.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) { }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) { }

            @Override
            public void afterTextChanged(Editable text) {
                if (validateAge(NumberUtil.parseNumber(text.toString()))) {
                    dialog.findViewById(R.id.age_error_message).setVisibility(View.GONE);
                } else {
                    dialog.findViewById(R.id.age_error_message).setVisibility(View.VISIBLE);
                }
            }
        });

        // validate name input on text change
        nameInput.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) { }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) { }

            @Override
            public void afterTextChanged(Editable text) {
                if (validateName(text.toString())) {
                    dialog.findViewById(R.id.name_error_message).setVisibility(View.GONE);
                } else {
                    dialog.findViewById(R.id.name_error_message).setVisibility(View.VISIBLE);
                }
            }
        });

    }

    public boolean validateAge(int age) {
        return age > 0 && age <= 130;
    }

    public boolean validateName(String name) {

        if (name.isEmpty() || name.trim() != name) {
            return false;
        }

        for (char c : name.toCharArray()) {
            if (Character.isDigit(c)) {
                return false;
            }
        }

         return true;
    }

    private void setToolColourToSelection(){
        int colourSelection = colorSelection.getCheckedRadioButtonId();
        RadioButton colourButton = colorSelection.findViewById(colourSelection);
        ColorStateList colourList =  colourButton.getButtonTintList();
        int buttonColour = colourList.getDefaultColor(); // Get the colour of the button
        colourButton.getBackground();
        binding.canvas.getBrushSettings().setColor(buttonColour);
    }
}