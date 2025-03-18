package com._thSem.Project.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
//import net.sourceforge.tess4j.ITesseract;
//import net.sourceforge.tess4j.Tesseract;
//import net.sourceforge.tess4j.TesseractException;

import java.io.File;

@RestController
@RequestMapping("/api")
public class OCRController {

//    private final String UPLOAD_DIR = "uploads/";
//
//    @GetMapping("/ocr")
//    public String performOCR(@RequestParam("filename") String filename) {
//        File imageFile = new File(UPLOAD_DIR + filename);
//
//        ITesseract instance = new Tesseract();
//        instance.setDatapath("tessdata"); // Path to Tesseract trained data
//
//        try {
//            return instance.doOCR(imageFile);
//        } catch (TesseractException e) {
//            return "Error processing image: " + e.getMessage();
//        }
//    }
}
