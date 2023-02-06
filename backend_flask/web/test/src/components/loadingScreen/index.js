import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './index.css';

const LoadingScreen = () => {
  return (
    <Container className="h-100 d-flex align-items-center">
      <Row className="w-100 mx-auto">
        <Col className="text-center">
          <div className="loading-text">
            Loading...
          </div>
          <img src={require('../../assets/loading-wheel.gif')} alt="Loading" className="loading-gif"/>
        </Col>
      </Row>
    </Container>
  );
};

export default LoadingScreen;
