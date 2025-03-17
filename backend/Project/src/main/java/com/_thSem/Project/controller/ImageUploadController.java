package com._thSem.Project.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

//import org.apache.tika.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class ImageUploadController {

//    private final String UPLOAD_DIR = "uploads/";
//
//    @PostMapping("/upload")
//    public String uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
//        if (file.isEmpty()) {
//            return "File is empty";
//        }
//
//        // Generate unique filename
//        String filename = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
//
//        // Ensure upload directory exists
//        Files.createDirectories(Paths.get(UPLOAD_DIR));
//
//        // Save file to disk
//        File savedFile = new File(UPLOAD_DIR + filename);
//        file.transferTo(savedFile);
//
//        // Validate if file is an image
//        Tika tika = new Tika();
//        String mimeType = tika.detect(savedFile);
//        if (!mimeType.startsWith("image")) {
//            return "Uploaded file is not an image";
//        }
//
//        // Return file path
//        return "File uploaded successfully: " + filename;
//    }
}