package com._thSem.Project.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Setter
@Getter

public class TimeTableUpdateRequest {
    public String day;
    public String email;
    public List<Slot> Slots;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

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
