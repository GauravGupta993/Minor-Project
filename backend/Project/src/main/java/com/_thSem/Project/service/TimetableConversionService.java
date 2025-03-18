package com._thSem.Project.service;

import lombok.*;
//import net.sourceforge.tess4j.ITesseract;
//import net.sourceforge.tess4j.Tesseract;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;


@Service


public class TimetableConversionService {

//    private final ITesseract tesseractInstance;
//
//    public TimetableConversionService() {
//        // Initialize the Tesseract OCR instance
//        tesseractInstance = new Tesseract();
//        tesseractInstance.setLanguage("eng"); // Set the OCR language to English
//        // Optionally, set the data path if necessary
//        // tesseractInstance.setDatapath("path_to_tesseract_directory");
//    }
//
//    /**
//     * Converts the image of the timetable into a 2D array of strings
//     *
//     * @param imagePath the path to the image file
//     * @return a 2D array representing the timetable
//     */
//    public String[][] convertImageToTimetable(String imagePath) {
//        try {
//            // Load the image from the given file path
//            BufferedImage image = ImageIO.read(new File(imagePath));
//
//            // Extract text from the image using OCR
//            String extractedText = tesseractInstance.doOCR(image);
//
//            // Print the extracted text for debugging (optional)
//            System.out.println("Extracted Text: \n" + extractedText);
//
//            // Parse the extracted text into a structured 2D array format
//            return parseTimetable(extractedText);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return new String[0][0]; // Return an empty 2D array in case of failure
//    }
//
//    /**
//     * Parses the extracted text into a 2D array
//     *
//     * @param extractedText the text extracted by OCR
//     * @return a 2D array representing the timetable
//     */
//    private String[][] parseTimetable(String extractedText) {
//        // Split the extracted text by line breaks to process each row (e.g. days)
//        String[] rows = extractedText.split("\n");
//
//        // Initialize the timetable array based on the number of rows
//        String[][] timetable = new String[rows.length][];

//        // Iterate through each row and split by whitespace or tabs to create cells
//        for (int i = 0; i < rows.length; i++) {
//            timetable[i] = rows[i].split("\\s+"); // Split by whitespace
//        }
//
//        return timetable;
//    }
}