package com._thSem.Project.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Setter
@Getter

public class TimeTableUpdateRequest {
    public String day;
    public List<Slot> Slots;

    public String getDay() {
        return day;
    }

    public List<Slot> getSlots() {
        return Slots;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public void setSlots(List<Slot> slots) {
        Slots = slots;
    }
}
