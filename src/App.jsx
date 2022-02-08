import React, { useState, useEffect } from 'react';
import TicketMaster from './TicketMaster';
import Nasa from "./Nasa";
import Weather from './Weather';
import './App.css';

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
      <TicketMaster lat={lat} lng={lng} />
     <Nasa />
      <nav id='header'>
        <h1>What's Going on in Your Area</h1>
      </nav>
      <Weather/>
    </div>
  );
}

export default App;
