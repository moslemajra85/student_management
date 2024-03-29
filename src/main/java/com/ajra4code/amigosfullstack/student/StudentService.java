package com.ajra4code.amigosfullstack.student;

import com.ajra4code.amigosfullstack.Validators.EmailValidator;
import com.ajra4code.amigosfullstack.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;

@Service
public class StudentService {

    private final StudentDataAccessService studentDataAccessService;


    @Autowired
    public StudentService(StudentDataAccessService studentDataAccessService) {
        this.studentDataAccessService = studentDataAccessService;
    }


    List<Student> getAllStudents() {

        return studentDataAccessService.selectAllStudents();

    }

    void addNewStudent(Student student) {

         addNewStudent(null, student);
    }

    void addNewStudent(UUID studentId, Student student) {

        UUID newStudentId = Optional.ofNullable(studentId).orElse(UUID.randomUUID());

        // todo: validate email
        EmailValidator emailValidator = new EmailValidator();
        if(!emailValidator.test(student.getEmail())) {
            throw new ApiRequestException("Email is not valid.");
        }

        // todo: verify that email is not taken
        List<Student> students = studentDataAccessService.selectAllStudents();
        students.forEach(st -> {
            if(st.getEmail().equals(student.getEmail())) {
                throw new ApiRequestException("Email already exist");
            }
        });


        studentDataAccessService.insertStudent(newStudentId, student);

    }



}
