package com._thSem.Project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;




@Entity

@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer sid;

    @Column(nullable = false)
    private String name;
//    @JsonIgnore
//    @OneToMany(mappedBy = "user")
//    private List<TimeTable> timeTables;

    @Column(unique = true, nullable = false)
    private String email;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    private String role;

    @Column(nullable = false)
    private String password;

    // Constructors
    public User() {}

    public User(Integer sid, String name, String email, String password,String role) {
        this.role=role;
        this.sid = sid;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public Integer getSid() {
        return sid;
    }


    public void setSid(Integer sid) {
        this.sid = sid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
