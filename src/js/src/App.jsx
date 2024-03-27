import { useEffect } from 'react';
import { useState } from 'react';
import create from './services/studentService';
import { Table } from 'antd';

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

  const columns = [
    {
      title: 'StudentId',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
  ];

  return (
    <div>
      {students.length === 0 ? (
        <p>No Students yest</p>
      ) : (
        <Table dataSource={students} rowKey="studentId" columns={columns} />
      )}
    </div>
  );
}

export default App;
