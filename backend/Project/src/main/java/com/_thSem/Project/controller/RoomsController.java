package com._thSem.Project.controller;

import com._thSem.Project.service.RoomsService;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomsController {
    private final RoomsService roomsService;

    public RoomsController(RoomsService roomsService) {
        this.roomsService = roomsService;
    }


    @GetMapping("freerooms/{day}/{slot}")
    public ResponseEntity<List<String> >getFreeRooms(@PathVariable String day, @PathVariable Integer slot){
        return  ResponseEntity.ok(roomsService.getfreerooms(day,slot));

    }
}
