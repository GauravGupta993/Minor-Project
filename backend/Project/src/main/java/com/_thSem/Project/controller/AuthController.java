package com._thSem.Project.controller;

import com._thSem.Project.entity.User;
import com._thSem.Project.service.OTPService;
import com._thSem.Project.service.TimeTableService;
import com._thSem.Project.service.UserService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/auth")

public class AuthController {

    private final OTPService otpService;

    private final UserService userService;

    private final  TimeTableService timeTableService;

    // Temporary storage for pending user registration (email -> User)
    private final Map<String, User> pendingUsers = new HashMap<>();

    public AuthController(OTPService otpService, UserService userService, TimeTableService timeTableService) {
        this.otpService = otpService;
        this.userService = userService;
        this.timeTableService = timeTableService;
    }

    // Step 1: Request Signup (Generate OTP and send email)
    @PostMapping("/signup/request")
    public String signupRequest(@RequestBody User user) {
        // Check if email already exists
        if (userService.findByEmail(user.getEmail()).isPresent()) {
            return "Email already registered";
        }
        // Generate OTP
        String otp = otpService.generateOTP(user.getEmail());
        // Store user details temporarily
        pendingUsers.put(user.getEmail(), user);
        // Send OTP email
        otpService.sendOTPEmail(user.getEmail(), otp);
        return "OTP sent to " + user.getEmail();
    }

    // Step 2: Verify OTP and complete signup
    @PostMapping("/signup/verify")
    public String verifyOTP(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String otp = payload.get("otp");
        if (otpService.validateOTP(email, otp)) {
            // Retrieve pending user details
            User user = pendingUsers.get(email);
            if (user != null) {
                // Create user in the database
                userService.createUser(user);
                // Cleanup temporary data
                otpService.removeOTP(email);
                pendingUsers.remove(email);
                User user1=userService.findByEmail(email).get();
                timeTableService.createTimeTable(user1);


                return "Signup successful";
            } else {
                return "No pending signup found for this email";
            }
        } else {
            return "Invalid OTP";
        }
    }

    // Login endpoint
    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");
        // Look up the user by email
        System.out.println(email);
        User user = userService.findByEmail(email).orElse(null);
        if (user != null && user.getPassword().equals(password)) {
            // In a real app, you would generate and return a token (like JWT)
            return "Login successful";
        } else {
            return "Invalid credentials";
        }
    }
}
