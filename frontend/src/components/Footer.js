import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-5' style={{ color: 'dimgray' }}>
            Copyright &copy; CampHunt
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
