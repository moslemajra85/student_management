package com.ajra4code.amigosfullstack.student;

import com.ajra4code.amigosfullstack.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@Repository
public class StudentDataAccessService {


    private  final JdbcTemplate jdbcTemplate;

   @Autowired
    public StudentDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

     List<Student> selectAllStudents() {
       String sql = "SELECT studentid, first_name, last_name, email, gender FROM student";
      return jdbcTemplate.query(sql, (resultSet, i) -> {
          return mapStudentFromDb(resultSet);
      });
     }

     int insertStudent(UUID studentId, Student student) {
         String sql = "INSERT INTO student (" +
                 "studentid, " +
                 "first_name, " +
                 "last_name," +
                 " email, " +
                 "gender) " +
                 "VALUES(?, ?, ?, ?, ?)";

         return jdbcTemplate.update(
                 sql,
                 studentId,
                 student.getFirstName(),
                 student.getLastName(),
                 student.getEmail(),
                 student.getGender().name().toUpperCase()
         );



    }

     boolean isEmailTaken(String email) {

       String sql = "SELECT EXISTS ( SELECT 1 " +
               "FROM student " +
               "WHERE email = ?)";

       return Boolean.TRUE.equals(jdbcTemplate.queryForObject(sql, new Object[]{email},
               (resultSet, i) -> resultSet.getBoolean(1)));
    }




    private static Student mapStudentFromDb(ResultSet resultSet) throws SQLException {
        // access columns and constructs a student object
        String studentIdStr = resultSet.getString("studentid");
        UUID studentId = UUID.fromString(studentIdStr);
        String firstName = resultSet.getString("first_name");
        String lastName = resultSet.getString("last_name");
        String email = resultSet.getString("email");
        String genderStr = resultSet.getString("gender").toUpperCase();
        Student.Gender gender = Student.Gender.valueOf(genderStr);
        return new Student(
                studentId, firstName, lastName, email, gender
        );
    }


}
