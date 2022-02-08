import React, { useState, useEffect } from 'react';

const baseURL = `https://api.openweathermap.org/data/2.5/weather`;

const Weather = (props) => {
    const key = 'd36a46dc51df18c7b4c1110ab98d8e5f';
    let url = `${baseURL}?lat=${props.lat}&lon=${props.lng}&appid=${key}`;
    const [temp, setTemp] = useState('Loading...');
    let celsius = Math.floor (temp - 273);
    let fahrenheit = Math.floor (celsius * (9/5) + 32);
    const [isFahrVisible, setisFahrVisible] = useState(true);

async function handleFetch() {

    try{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.main.temp);
        setTemp(data.main.temp);

    } catch (err) {
        console.error(err);
    }}

function handleToggle(event) {
    event.preventDefault()
    setisFahrVisible(!isFahrVisible)
}

useEffect(() => {
    if (props.lat && props.lng) {
        handleFetch();
    }
  }, [props.lat, props.lng]);


    return ( 
    <div>
        <form id='weather'>
            <h1>Indianapolis</h1>
            <img id='weatherIcon' src="https://purepng.com/public/uploads/large/purepng.com-weather-iconsymbolsiconsapple-iosiosios-8-iconsios-8-721522596142qx4ep.png" alt="weatherIcon" />
            {isFahrVisible === true ? <p>Temperature: {fahrenheit}ºF</p> : <p>Temperature: {celsius}ºC</p>}
                <button id='tempType' onClick={(handleToggle)}>Change Unit</button>
        </form>
    </div> 
    );
    }
    
export default Weather;