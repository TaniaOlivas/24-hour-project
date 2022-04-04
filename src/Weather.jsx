import React, { useState, useEffect } from 'react';
import { Button, Form } from 'reactstrap';

const baseURL = `https://api.openweathermap.org/data/2.5/weather`;

const Weather = (props) => {
  const key = process.env.REACT_APP_WEATHER_API_KEY;
  let url = `${baseURL}?lat=${props.lat}&lon=${props.lng}&appid=${key}`;
  const [temp, setTemp] = useState('Loading...');
  let celsius = Math.floor(temp - 273);
  let fahrenheit = Math.floor(celsius * (9 / 5) + 32);
  const [isFahrVisible, setisFahrVisible] = useState(true);

  async function handleFetch() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTemp(data.main.temp);
    } catch (err) {
      console.error(err);
    }
  }

  function handleToggle(event) {
    event.preventDefault();
    setisFahrVisible(!isFahrVisible);
  }

  useEffect(() => {
    if (props.lat && props.lng) {
      handleFetch();
    }
  }, [props.lat, props.lng]);

  return (
    <div>
      <Form id="weather" className="form p-1" style={{ height: '250px' }}>
        <h2 className="pb-2">Current Weather</h2>
        <img
          id="weatherIcon"
          src="https://purepng.com/public/uploads/large/purepng.com-weather-iconsymbolsiconsapple-iosiosios-8-iconsios-8-721522596142qx4ep.png"
          alt="weatherIcon"
          className="mb-3"
        />
        {isFahrVisible === true ? (
          <p>Temperature: {fahrenheit}ºF</p>
        ) : (
          <p>Temperature: {celsius}ºC</p>
        )}
        <Button id="tempType" className="weatherbtn" onClick={handleToggle}>
          Change Unit
        </Button>
      </Form>
    </div>
  );
};

export default Weather;
