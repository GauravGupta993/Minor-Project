package com._thSem.Project.controller;

import com._thSem.Project.service.TimetableConversionService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@NoArgsConstructor
@RequestMapping("/api")
public class Hello {

       // public final TimetableConversionService timetableConversionService;


    @GetMapping("/hello")
    public String sayHello() {
        TimetableConversionService timetableConversionService=new TimetableConversionService();
        timetableConversionService.convertImageToTimetable("https://drive.google.com/file/d/1fIB62yaaNUGEHD9wK-N8wGKan52gP-Ja/view?usp=sharing");
        return "Hello, Spring Boot is running!";
    }
}
