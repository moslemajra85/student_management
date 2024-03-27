import { useEffect } from 'react';
import { useState } from 'react';
import create from './services/studentService';

function App() {
  const [students, setStudents] = useState([]);
  const studentService = create('/students');

  useEffect(() => {
    const { request, cancel } = studentService.getAllStudent();

    request.then((response) => {
      setStudents(response.data);
    });

    return () => cancel;
  }, []);

  return (
    <div>
      {students.map((st) => (
        <div key={st.studentId}>
          <p>{st.firstName}</p>
          <p>{st.lastName}</p>
          <p>{st.email}</p>
          <p>{st.gender}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
