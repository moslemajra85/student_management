package com.ajra4code.amigosfullstack.student;

import com.ajra4code.amigosfullstack.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
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
                 "VALUES(?, ?, ?, ?, ?::gender)";

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


    public List<StudentCourse> getAllCourseForStudent(UUID studentId) {

       String sql = "SELECT student.studentid, " +
               "course.course_id, " +
               "course.name, " +
               "course.description, " +
               "course.department, " +
               "course.teacher_name, " +
               "student_course.start_date, " +
               "student_course.end_date, " +
               "student_course.grade " +
               "from student " +
               "join student_course on student_course.student_id = student.studentid " +
               "join course on student_course.course_id = course.course_id " +
               "where student.studentid = ?";

          return jdbcTemplate.query(sql, new Object[]{studentId}, mapStudentCourseFromDb());


    }

    private RowMapper<StudentCourse> mapStudentCourseFromDb() {
       // getting every single field and transform it ot java object
        return (resultSet, i) ->
                new StudentCourse(
                        UUID.fromString(resultSet.getString("studentid")),
                        UUID.fromString(resultSet.getString("course_id")),
                        resultSet.getString("name"),
                        resultSet.getString("description"),
                        resultSet.getString("department"),
                        resultSet.getString("teacher_name"),
                        resultSet.getDate("start_date").toLocalDate(),
                        resultSet.getDate("end_date").toLocalDate(),
                        Optional.ofNullable(resultSet.getString("grade"))
                                .map(Integer::parseInt)
                                .orElse(null)
                );
    }
}
