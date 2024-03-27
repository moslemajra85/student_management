package com.ajra4code.amigosfullstack.student;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("students")
public class StudentController {

    @GetMapping
    @CrossOrigin(origins = "http://localhost:5173/")
    public List<Student> getAllStudents() {
        return List.of(
                new Student(UUID.randomUUID(), "James",
                        "Bond", "jamesbond@email.com",Student.Gender.MALE
                        ),
                new Student(UUID.randomUUID(), "Elisa",
                        "Tamara", "elisaTamara@email.com", Student.Gender.FEMALE
                )
        );
    }
}
