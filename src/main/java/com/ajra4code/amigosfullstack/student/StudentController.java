package com.ajra4code.amigosfullstack.student;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        return studentService.getAllStudents();

    }

    @PostMapping
    @CrossOrigin(origins = "http://localhost:5173/")
    public void addNewStudent(@Valid @RequestBody Student student) {

       studentService.addNewStudent(student);

    }
}
