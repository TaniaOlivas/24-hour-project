import React, { useState, useEffect } from 'react';
import Nasa from './Nasa';
import TicketMaster from './TicketMaster';
import Maps from './Maps';
import Weather from './Weather';
import './App.css';
import { Col, Container, Nav, Row } from 'reactstrap';

function App() {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [status, setStatus] = useState('null');

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus('Unable to retrieve your location');
        }
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      <Nav id="header" className="justify-content-center mt-3">
        <h1>What's Going on in Your Area</h1>
      </Nav>
      <Container className="pt-3">
        <Row className="align-items-center justify-content-center">
          <Col lg="4">
            <Row>
              <Col className="p-2 mb-2" lg="12" xs="6">
                <Weather lat={lat} lng={lng} />
              </Col>
              <Col className="p-2 mb-2" lg="12" xs="6">
                <Maps lat={lat} lng={lng} />
              </Col>
              <Col className="p-2 mb-2" lg="12" xs="6">
                <Nasa lat={lat} lng={lng} />
              </Col>
            </Row>
          </Col>
          <Col lg="8">
            <TicketMaster lat={lat} lng={lng} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
