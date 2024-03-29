import Container from './Container';
import { Button, Avatar } from 'antd';

const Footer = ({ students, showModal }) => {
  return (
    <div className="footer">
      <Container>
        {students.length && (
          <Avatar
            style={{ backgroundColor: '#f56a00', marginRight: '10px' }}
            size="large"
          >
            {students.length}
          </Avatar>
        )}
        <Button onClick={showModal} type="primary">Add New Student +</Button>
      </Container>
    </div>
  );
};

export default Footer;
