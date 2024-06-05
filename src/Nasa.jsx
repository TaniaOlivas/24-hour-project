import React, { useState, useEffect } from 'react';
import { Form } from 'reactstrap';

const baseURL = 'https://api.nasa.gov/planetary/earth/imagery';
const API_Key = process.env.REACT_APP_NASA_API_KEY;

const Nasa = (props) => {
  const [picture, setPicture] = useState('');

  async function handleFetch() {
    const url = `${baseURL}?lon=${props.lng}&lat=${props.lat}&date=2018-01-01&dim=0.15&api_key=${API_Key}`;

    try {
      const response = await fetch(url);
      const data = await response;
      setPicture(data.url);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (props.lat && props.lng) {
      handleFetch();
    }
  }, [props.lat, props.lng]);

  return (
    <div>
      <Form id="nasa" className="form p-1" style={{ height: '250px' }}>
        <h2>Hello from NASA</h2>
        <img id="mapImg" src={picture} alt="Satellite View" />
      </Form>
    </div>
  );
};

export default Nasa;
