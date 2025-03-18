package com._thSem.Project.controller;

import com._thSem.Project.model.TimeTableUpdateRequest;
import com._thSem.Project.service.TimeTableService;
import com._thSem.Project.service.TimetableConversionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/timetable")
@RequiredArgsConstructor
public class TimetableController {
 private TimeTableService timeTableService;
    @PostMapping("/update")
        public  ResponseEntity<Boolean> update(@RequestBody TimeTableUpdateRequest timeTableUpdateRequest){
        timeTableService.update(timeTableUpdateRequest.getEmail(), timeTableUpdateRequest);
        return ResponseEntity.ok(true);
        }
    @GetMapping("/{email}/{day}")
    public ResponseEntity<TimeTableUpdateRequest>get(@PathVariable String email ,@PathVariable String day){
        return ResponseEntity.ok(timeTableService.getTimeTable(email,day));

    }
    @GetMapping("/nextfree/{email}")
    public ResponseEntity<TimeTableUpdateRequest>nextfree(@PathVariable String email ){
        return ResponseEntity.ok(timeTableService.getFreeSlot(email));

    }





}
