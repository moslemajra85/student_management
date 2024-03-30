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
    private final EmailValidator emailValidator;


    @Autowired
    public StudentService(StudentDataAccessService studentDataAccessService,
                          EmailValidator emailValidator) {
        this.studentDataAccessService = studentDataAccessService;
        this.emailValidator = emailValidator;
    }


    List<Student> getAllStudents() {

        return studentDataAccessService.selectAllStudents();

    }


    List<StudentCourse> getAllCoursesForStudent(UUID studentId) {
        return studentDataAccessService.getAllCourseForStudent(studentId);

    }

    void addNewStudent(Student student) {

         addNewStudent(null, student);
    }

    void addNewStudent(UUID studentId, Student student) {

        UUID newStudentId = Optional.ofNullable(studentId).orElse(UUID.randomUUID());

        // todo: validate email
         if(!emailValidator.test(student.getEmail())) {
            throw new ApiRequestException("Email is not valid.");
        }

        // todo: verify that email is not taken
         if(studentDataAccessService.isEmailTaken(student.getEmail())){
             throw new ApiRequestException("Email " + student.getEmail() + " is already taken");
         }


        studentDataAccessService.insertStudent(newStudentId, student);


    }






}
