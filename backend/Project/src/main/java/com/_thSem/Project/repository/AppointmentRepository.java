package com._thSem.Project.repository;

import com._thSem.Project.entity.Appointment;
import com._thSem.Project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
    List<Appointment> findByStudent(User student);
    
    List<Appointment> findByTeacher(User teacher);
    
    List<Appointment> findByStudentAndTeacher(User student, User teacher);
    
    @Query("SELECT a FROM Appointment a WHERE a.teacher = ?1 AND a.date = ?2 AND a.slotNumber = ?3")
    List<Appointment> findByTeacherAndDateAndSlot(User teacher, LocalDate date, Integer slotNumber);

    @Query("SELECT DISTINCT a.slotNumber FROM Appointment a WHERE a.teacher = ?1 AND a.date = ?2")
    List<Integer> findBookedSlotsByTeacherAndDate(User teacher, LocalDate date);
} 