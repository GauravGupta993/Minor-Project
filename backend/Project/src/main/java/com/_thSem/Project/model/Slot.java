package com._thSem.Project.model;

import lombok.Getter;
import lombok.Setter;

//@Getter
//@Setter
public class Slot {
    public  Boolean hasClass;
    public String room;
    public Integer slot;
    // Getter for hasClass
    public Boolean getHasClass() {
        return hasClass;
    }

    // Setter for hasClass
    public void setHasClass(Boolean hasClass) {
        this.hasClass = hasClass;
    }

    // Getter for room
    public String getRoom() {
        return room;
    }

    // Setter for room
    public void setRoom(String room) {
        this.room = room;
    }

    // Getter for slot
    public Integer getSlot() {
        return slot;
    }

    // Setter for slot
    public void setSlot(Integer slot) {
        this.slot = slot;
    }
}
