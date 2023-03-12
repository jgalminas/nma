package com.example.nmadrawingapp.view;

import android.app.AlertDialog;
import android.app.Dialog;
import android.content.res.Resources;
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
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioGroup;

import com.example.nmadrawingapp.R;
import com.example.nmadrawingapp.databinding.FragmentDrawingBinding;
import com.example.nmadrawingapp.model.data_sources.db.entitites.Image;
import com.example.nmadrawingapp.model.repositories.ImageRepository;
import com.example.nmadrawingapp.view.components.CanvasView;
import com.example.nmadrawingapp.viewmodel.SharedViewModel;

import javax.inject.Inject;

import dagger.hilt.android.AndroidEntryPoint;

@AndroidEntryPoint
public class DrawingFragment extends Fragment {

    private SharedViewModel sharedViewModel;
    private FragmentDrawingBinding binding;

    private Dialog dialog;

    private RadioGroup colorSelection;
    private RadioGroup drawTypeSelection;
    private RadioGroup strokeWidthSelection;



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
            showDialog();
        });

        colorSelection = (RadioGroup) getView().findViewById(R.id.radioGroupColorSelector);
        colorSelection.check(R.id.radioButtonBlack);


        colorSelection.setOnCheckedChangeListener((radioGroup, i) -> {
            RetrieveColor(i);

        });

        drawTypeSelection = (RadioGroup) getView().findViewById(R.id.radioGroupDrawTypeSelection);
        drawTypeSelection.check(R.id.radioButtonLineDraw);
        drawTypeSelection.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup radioGroup, int i) {
                int colorId = colorSelection.getCheckedRadioButtonId();
                switch (i){


                    case R.id.radioButtonLineDraw:
                        binding.canvas.setStyleStroke();

                        RetrieveColor(colorId);

                        break;
                    case R.id.radioButtonFillDraw:
                        binding.canvas.setStyleFill();

                        RetrieveColor(colorId);

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
                int strokeSelection = drawTypeSelection.getCheckedRadioButtonId();

                switch (i){
                    case R.id.radioButtonThinnestStroke:
                        binding.canvas.getBrushSettings().setWidth(3);
                        RetrieveBrushType(strokeSelection);
                        break;
                    case R.id.radioButtonThinStroke:
                        binding.canvas.getBrushSettings().setWidth(6);
                        RetrieveBrushType(strokeSelection);
                        break;
                    case R.id.radioButtonMediumStroke:
                        binding.canvas.getBrushSettings().setWidth(9);
                        RetrieveBrushType(strokeSelection);
                        break;
                    case R.id.radioButtonThickStroke:
                        binding.canvas.getBrushSettings().setWidth(12);
                        RetrieveBrushType(strokeSelection);
                        break;
                    case R.id.radioButtonThickestStroke:
                        binding.canvas.getBrushSettings().setWidth(15);
                        RetrieveBrushType(strokeSelection);
                        break;
                }
            }
        });
//       binding.buttonColorBlue.setOnClickListener(button -> {
//
//           binding.canvas.getBrushSettings().setColor(getResources().getColor(R.color.blue));
//       });

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

        

        // register on cancel listener
        dialog.findViewById(R.id.cancel_button).setOnClickListener(button -> {
            dialog.cancel();
        });

        // register on save listener
        dialog.findViewById(R.id.save_button).setOnClickListener(button -> {

            int age = parseAge(ageInput.getText().toString());
            boolean ageIsValid = validateAge(age);

            if (ageIsValid) {
                imageRepository.insertImage(new Image(
                        sharedViewModel.getEventId(),
                        age,
                        binding.canvas.getImageBytes()
                ));

                binding.canvas.clearCanvas();
                binding.canvas.setStyleStroke();
                colorSelection.check(R.id.radioButtonBlack);
                strokeWidthSelection.check(R.id.radioButtonMediumStroke);
                dialog.dismiss();

            }

        });

        // validate age input on text change
        ageInput.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void afterTextChanged(Editable text) {
                if (validateAge(parseAge(text.toString()))) {
                    dialog.findViewById(R.id.error_message).setVisibility(View.GONE);
                } else {
                    dialog.findViewById(R.id.error_message).setVisibility(View.VISIBLE);
                }
            }
        });

    }

    private boolean validateAge(int age) {
        return age > 0 && age <= 130;
    }

    private int parseAge(String text) {
        try {
            return Integer.parseInt(text);
        } catch (NumberFormatException e) {
            return 0;
        }
    }


    private void RetrieveBrushType(int i){
        if (i==R.id.radioButtonEraser){

        }else{
            drawTypeSelection.check(R.id.radioButtonLineDraw);
        }
    }

    public void RetrieveBrushTypeForColorChange(int i){
        if (i==R.id.radioButtonEraser){
            drawTypeSelection.check(R.id.radioButtonLineDraw);
        }
    }
    private void RetrieveColor(int i){
        int strokeSelection = drawTypeSelection.getCheckedRadioButtonId();

        switch(i){
            case R.id.radioButtonRed:
                binding.canvas.getBrushSettings().setColor(getResources().getColor(R.color.red));
                RetrieveBrushTypeForColorChange(strokeSelection);
                break;
            case R.id.radioButtonOrange:
                binding.canvas.getBrushSettings().setColor(getResources().getColor(R.color.orange));
                RetrieveBrushTypeForColorChange(strokeSelection);
                break;
            case R.id.radioButtonYellow:
                binding.canvas.getBrushSettings().setColor(getResources().getColor(R.color.yellow));
                RetrieveBrushTypeForColorChange(strokeSelection);
                break;
            case R.id.radioButtonYellowGreen:
                binding.canvas.getBrushSettings().setColor(getResources().getColor(R.color.yellow_green));
                RetrieveBrushTypeForColorChange(strokeSelection);
                break;
            case R.id.radioButtonGreen:
                binding.canvas.getBrushSettings().setColor(getResources().getColor(R.color.green));
                RetrieveBrushTypeForColorChange(strokeSelection);
                break;
            case R.id.radioButtonBlueGreen:
                binding.canvas.getBrushSettings().setColor(getResources().getColor(R.color.blue_green));
                RetrieveBrushTypeForColorChange(strokeSelection);
                break;
            case R.id.radioButtonLightBlue:
                binding.canvas.getBrushSettings().setColor(getResources().getColor(R.color.light_blue));
                RetrieveBrushTypeForColorChange(strokeSelection);
                break;
            case R.id.radioButtonBlue:
                binding.canvas.getBrushSettings().setColor(getResources().getColor(R.color.blue));
                RetrieveBrushTypeForColorChange(strokeSelection);
                break;
            case R.id.radioButtonPurple:
                binding.canvas.getBrushSettings().setColor(getResources().getColor(R.color.purple));
                RetrieveBrushTypeForColorChange(strokeSelection);
                break;
            case R.id.radioButtonRedViolet:
                binding.canvas.getBrushSettings().setColor(getResources().getColor(R.color.red_violet));
                RetrieveBrushTypeForColorChange(strokeSelection);
                break;
            case R.id.radioButtonBrown:
                binding.canvas.getBrushSettings().setColor(getResources().getColor(R.color.brown));
                RetrieveBrushTypeForColorChange(strokeSelection);
                break;
            case R.id.radioButtonBlack:
                binding.canvas.getBrushSettings().setColor(getResources().getColor(R.color.black));
                RetrieveBrushTypeForColorChange(strokeSelection);
                break;

        }
    }

}