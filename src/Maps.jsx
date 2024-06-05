import React, { useState, useEffect } from 'react';
import { Form } from 'reactstrap';

const baseURL = 'https://maps.googleapis.com/maps/api/staticmap';
const API_Key = process.env.REACT_APP_MAPS_API_KEY;

const Maps = (props) => {
  const [map, setMap] = useState(' ');

  async function handleFetch() {
    let url = `${baseURL}?markers=${props.lat},${props.lng}&size=300x300&scale=2&key=${API_Key}`;

    try {
      const response = await fetch(url);
      const data = await response;
      setMap(data.url);
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
      <div>
        <Form className="form p-1" style={{ height: '250px' }}>
          <h2 style={{ marginBottom: '0px' }}>Map Image</h2>
          <img id="mapImg" src={map} alt="Map of location" />
        </Form>
      </div>
    </div>
  );
};

export default Maps;
