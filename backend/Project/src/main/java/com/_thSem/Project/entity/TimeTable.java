package com._thSem.Project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter

@Entity
public class TimeTable {
    @Id
    @GeneratedValue
    private  Integer id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public User user;
    private  String day;
    public  Boolean hasClass;
    public String room;
    public Integer slot;


    public Integer getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getDay() {
        return day;
    }

    public Boolean getHasClass() {
        return hasClass;
    }

    public String getRoom() {
        return room;
    }

    public Integer getSlot() {
        return slot;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public void setHasClass(Boolean hasClass) {
        this.hasClass = hasClass;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public void setSlot(Integer slot) {
        this.slot = slot;
    }
}
