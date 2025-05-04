package com._thSem.Project.service;

import com._thSem.Project.entity.Appointment;
import com._thSem.Project.entity.User;
import com._thSem.Project.entity.TimeTable;
import com._thSem.Project.enums.AppointmentStatus;
import com._thSem.Project.repository.AppointmentRepository;
import com._thSem.Project.repository.UserRepository;
import com._thSem.Project.repository.TimeTableRepository;
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
    private TimeTableRepository timeTableRepository;

    @Autowired
    private TimeTableService timetableService;

    // Get all teachers
    public List<User> getAllTeachers() {
        return userRepository.findByRole("teacher");
    }
    // Add this to TimetableConversionService
public List<Integer> getBusySlotsByUserAndDay(Integer userId, int dayOfWeek) {
        List<TimeTable> timetableEntries = timeTableRepository.findByUser_SidAndDayOfWeek(userId, dayOfWeek);
        return timetableEntries.stream()
                .map(TimeTable::getSlot)
                .collect(Collectors.toList());
    }

    // Get free slots for a teacher on a given date
    public List<Integer> getTeacherFreeSlots(Integer teacherId, LocalDate date) {
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        
        // Get all slots from 1 to 8
        List<Integer> allSlots = IntStream.rangeClosed(1, 8).boxed().collect(Collectors.toList());
        
        // Find day of week (1-7, where 1 is Monday)
        int dayOfWeek = date.getDayOfWeek().getValue();
        
        // Get teacher's timetable to find slots that have classes
        // This assumes TimeTable has a method to get busy slots for a specific day
        List<Integer> busySlots = timetableService.getBusySlotsByUserAndDay(teacher.getSid(), dayOfWeek);
        
        // Remove busy slots from all slots to get free slots
        allSlots.removeAll(busySlots);
        
        return allSlots;
    }

    // Create an appointment
    public Appointment createAppointment(Integer studentId, Integer teacherId, LocalDate date, 
                                         Integer slotNumber, String description) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        
        // Check if teacher has a class in this slot
        int dayOfWeek = date.getDayOfWeek().getValue();
        List<Integer> busySlots = timetableService.getBusySlotsByUserAndDay(teacher.getSid(), dayOfWeek);
        
        if (busySlots.contains(slotNumber)) {
            throw new RuntimeException("Teacher has a class in this slot");
        }
        
        // Allow multiple appointments in a free slot, so no need to check existing appointments
        
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