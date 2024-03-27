import { useEffect } from 'react';
import { useState } from 'react';
import create from './services/studentService';
import { Table, Avatar, Spin, Alert } from 'antd';
import Container from './components/Container';

function App() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const studentService = create('/students');

  useEffect(() => {
    const { request, cancel } = studentService.getAllStudent();
    setIsLoading(true);
    request
      .then((response) => {
        setStudents(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });

    return () => cancel;
  }, []);

  const columns = [
    {
      title: '',
      key: 'avatar',
      render: (text, student) => {
        return (
          <Avatar size="default">
            {`${student.firstName.charAt(0).toUpperCase()}${student.firstName
              .charAt(0)
              .toUpperCase()}`}
          </Avatar>
        );
      },
    },
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
      <Container>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Table
            dataSource={students}
            rowKey="studentId"
            columns={columns}
            pagination={false}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
