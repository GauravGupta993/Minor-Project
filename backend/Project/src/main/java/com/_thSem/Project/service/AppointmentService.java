package com._thSem.Project.service;

import com._thSem.Project.entity.Appointment;
import com._thSem.Project.entity.User;
import com._thSem.Project.enums.AppointmentStatus;
import com._thSem.Project.repository.AppointmentRepository;
import com._thSem.Project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TimetableConversionService timetableService;

    // Get all teachers
    public List<User> getAllTeachers() {
        return userRepository.findByRole("teacher");
    }

    // Get free slots for a teacher on a given date
    public List<Integer> getTeacherFreeSlots(Integer teacherId, LocalDate date) {
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        
        // Get all slots from 1 to 8 (assuming 8 slots per day)
        List<Integer> allSlots = IntStream.rangeClosed(1, 8).boxed().collect(Collectors.toList());
        
        // Get booked slots from appointments
        List<Integer> bookedSlots = appointmentRepository.findBookedSlotsByTeacherAndDate(teacher, date);
        
        // Remove booked slots from all slots
        allSlots.removeAll(bookedSlots);
        
        // TODO: Check teacher's timetable and remove slots where they have classes
        
        return allSlots;
    }

    // Create an appointment
    public Appointment createAppointment(Integer studentId, Integer teacherId, LocalDate date, 
                                         Integer slotNumber, String description) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        
        // Check if the slot is available
        List<Appointment> existingAppointments = appointmentRepository
                .findByTeacherAndDateAndSlot(teacher, date, slotNumber);
        
        if (!existingAppointments.isEmpty()) {
            throw new RuntimeException("This slot is already booked");
        }
        
        // TODO: Check teacher's timetable and confirm they don't have a class at this slot
        
        // Define start and end times based on slot number (example mapping)
        Map<Integer, LocalTime[]> slotTimes = Map.of(
            1, new LocalTime[]{LocalTime.of(9, 0), LocalTime.of(10, 0)},
            2, new LocalTime[]{LocalTime.of(10, 0), LocalTime.of(11, 0)},
            3, new LocalTime[]{LocalTime.of(11, 0), LocalTime.of(12, 0)},
            4, new LocalTime[]{LocalTime.of(12, 0), LocalTime.of(13, 0)},
            5, new LocalTime[]{LocalTime.of(14, 0), LocalTime.of(15, 0)},
            6, new LocalTime[]{LocalTime.of(15, 0), LocalTime.of(16, 0)},
            7, new LocalTime[]{LocalTime.of(16, 0), LocalTime.of(17, 0)},
            8, new LocalTime[]{LocalTime.of(17, 0), LocalTime.of(18, 0)}
        );
        
        LocalTime startTime = slotTimes.get(slotNumber)[0];
        LocalTime endTime = slotTimes.get(slotNumber)[1];
        
        Appointment appointment = new Appointment(student, teacher, date, slotNumber, description);
        
        return appointmentRepository.save(appointment);
    }

    // Get appointments for a student
    public List<Appointment> getStudentAppointments(Integer studentId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        
        return appointmentRepository.findByStudent(student);
    }

    // Get appointments for a teacher
    public List<Appointment> getTeacherAppointments(Integer teacherId) {
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        
        return appointmentRepository.findByTeacher(teacher);
    }

    // Get appointments between a specific student and teacher
    public List<Appointment> getAppointmentsBetweenStudentAndTeacher(Integer studentId, Integer teacherId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        
        return appointmentRepository.findByStudentAndTeacher(student, teacher);
    }

    // Accept an appointment
    public Appointment acceptAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        appointment.setStatus(AppointmentStatus.ACCEPTED);
        return appointmentRepository.save(appointment);
    }

    // Reject an appointment with an alternative slot suggestion
    public Appointment rejectAppointment(Long appointmentId, String alternativeSlot) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        appointment.setStatus(AppointmentStatus.REJECTED);
        appointment.setAlternativeSlot(alternativeSlot);
        return appointmentRepository.save(appointment);
    }
} 