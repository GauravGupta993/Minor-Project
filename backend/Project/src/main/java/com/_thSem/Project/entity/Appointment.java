package com._thSem.Project.entity;

import com._thSem.Project.enums.AppointmentStatus;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    private User teacher;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Integer slotNumber;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private AppointmentStatus status = AppointmentStatus.UNSEEN;

    private String alternativeSlot;

    // Constructors
    public Appointment() {}

    public Appointment(User student, User teacher, LocalDate date, Integer slotNumber, String description) {
        this.student = student;
        this.teacher = teacher;
        this.date = date;
        this.slotNumber = slotNumber;
        this.description = description;
        this.status = AppointmentStatus.UNSEEN;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public User getTeacher() {
        return teacher;
    }

    public void setTeacher(User teacher) {
        this.teacher = teacher;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getSlotNumber() {
        return slotNumber;
    }

    public void setSlotNumber(Integer slotNumber) {
        this.slotNumber = slotNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public AppointmentStatus getStatus() {
        return status;
    }

    public void setStatus(AppointmentStatus status) {
        this.status = status;
    }

    public String getAlternativeSlot() {
        return alternativeSlot;
    }

    public void setAlternativeSlot(String alternativeSlot) {
        this.alternativeSlot = alternativeSlot;
    }
} 