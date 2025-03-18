package com._thSem.Project.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
@Entity
public class Rooms {
    @Id
    @GeneratedValue
    private  Integer id;
    private String room;
    private  Integer number;
    private String day;
    private Integer slot;
}
