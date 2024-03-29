package com.ajra4code.amigosfullstack.student;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("students")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:5173/")
    public List<Student> getAllStudents() {
       //throw new IllegalArgumentException("Cannot get all students");
        return studentService.getAllStudents();

    }

    @PostMapping
    @CrossOrigin(origins = "http://localhost:5173/")
    public void addNewStudent(@RequestBody Student student) {

       studentService.addNewStudent(student);

    }
}
