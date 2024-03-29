import { useEffect } from 'react';
import { useState } from 'react';
import create from './services/studentService';
import { Table, Avatar, Spin, Modal, Tag, notification } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import Container from './components/Container';
import Footer from './components/Footer';
import AddStudentForm from './components/forms/AddStudentForm';
import { CanceledError } from './services/httpClient';
// import { ErrorNotification } from './components/Notification';

function App() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const studentService = create('/students');
  const { request, cancel } = studentService.getAllStudent();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message,
      description,
    });
  };

  const SuccessNotification = (message, description) =>
    openNotificationWithIcon('success', message, description);

  const InfoNotification = (message, description) =>
    openNotificationWithIcon('info', message, description);

  const WarningNotification = (message, description) =>
    openNotificationWithIcon('warning', message, description);

  const ErrorNotification = (message, description) =>
    openNotificationWithIcon('error', message, description);

  useEffect(() => {
    setIsLoading(true);
    fetchStudents();
    return () => cancel;
  }, []);

  const fetchStudents = () => {
    request
      .then((response) => {
        setStudents(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setIsLoading(false);
        ErrorNotification('Cannot Fecth Students', error.message);
      });
  };

  const showModal = () => {
    setIsOpen(true);
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const columns = [
    {
      title: '',
      key: 'avatar',
      render: (text, student) => {
        return (
          <Avatar size="default">
            {`${student.firstName.charAt(0).toUpperCase()}${student.lastName
              .charAt(0)
              .toUpperCase()}`}
          </Avatar>
        );
      },
    },
    // {
    //   title: 'StudentId',
    //   dataIndex: 'studentId',
    //   key: 'studentId',
    // },
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

  if (error)
    return (
      <>
        <Tag icon={<CloseCircleOutlined />} color="error">
          {error}
        </Tag>
        {contextHolder}
      </>
    );
  return (
    <div>
      {contextHolder}
      <Container>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Table
            style={{ marginBottom: '100px' }}
            dataSource={students}
            rowKey="studentId"
            columns={columns}
            pagination={false}
          />
        )}
        <Modal
          title="Add New Student"
          open={isOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
        >
          <AddStudentForm
            onSuccess={(student) => {
              handleCancel();

              setStudents([...students, student]);
              setIsLoading(true);
              studentService
                .addNewStudent(student)
                .then(() => {
                  setIsLoading(false);
                  SuccessNotification(
                    'Add Operation Succeeded',
                    'New Studend is Added To The Database'
                  );
                })
                .catch((error) => {
                  setError(error.message);
                });
            }}
          />
        </Modal>
        <Footer showModal={showModal} students={students} />
      </Container>
    </div>
  );
}

export default App;
