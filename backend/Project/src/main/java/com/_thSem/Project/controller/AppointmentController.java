package com._thSem.Project.controller;

import com._thSem.Project.entity.Appointment;
import com._thSem.Project.entity.User;
import com._thSem.Project.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Get all teachers for appointment selection
    @GetMapping("/teachers")
    public ResponseEntity<List<User>> getAllTeachers() {
        return ResponseEntity.ok(appointmentService.getAllTeachers());
    }

    // Get teacher's free slots for a specific date
    @GetMapping("/teachers/{teacherId}/free-slots")
    public ResponseEntity<List<Integer>> getTeacherFreeSlots(
            @PathVariable Integer teacherId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(appointmentService.getTeacherFreeSlots(teacherId, date));
    }

    // Create a new appointment
    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody Map<String, Object> request) {
        Integer studentId = (Integer) request.get("studentId");
        Integer teacherId = (Integer) request.get("teacherId");
        LocalDate date = LocalDate.parse((String) request.get("date"));
        Integer slotNumber = (Integer) request.get("slotNumber");
        String description = (String) request.get("description");

        Appointment appointment = appointmentService.createAppointment(
                studentId, teacherId, date, slotNumber, description);
        return ResponseEntity.ok(appointment);
    }

    // Get appointments for a student
    @GetMapping("/students/{studentId}")
    public ResponseEntity<List<Appointment>> getStudentAppointments(@PathVariable Integer studentId) {
        return ResponseEntity.ok(appointmentService.getStudentAppointments(studentId));
    }

    // Get appointments for a teacher
    @GetMapping("/teachers/{teacherId}")
    public ResponseEntity<List<Appointment>> getTeacherAppointments(@PathVariable Integer teacherId) {
        return ResponseEntity.ok(appointmentService.getTeacherAppointments(teacherId));
    }

    // Get appointments between a specific student and teacher
    @GetMapping("/students/{studentId}/teachers/{teacherId}")
    public ResponseEntity<List<Appointment>> getAppointmentsBetweenStudentAndTeacher(
            @PathVariable Integer studentId,
            @PathVariable Integer teacherId) {
        return ResponseEntity.ok(
                appointmentService.getAppointmentsBetweenStudentAndTeacher(studentId, teacherId));
    }

    // Accept an appointment
    @PutMapping("/{appointmentId}/accept")
    public ResponseEntity<Appointment> acceptAppointment(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(appointmentService.acceptAppointment(appointmentId));
    }

    // Reject an appointment with an alternative slot
    @PutMapping("/{appointmentId}/reject")
    public ResponseEntity<Appointment> rejectAppointment(
            @PathVariable Long appointmentId,
            @RequestBody Map<String, String> request) {
        String alternativeSlot = request.get("alternativeSlot");
        return ResponseEntity.ok(appointmentService.rejectAppointment(appointmentId, alternativeSlot));
    }
} 