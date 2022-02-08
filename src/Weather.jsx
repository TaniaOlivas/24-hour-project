import React, { useState, useEffect } from 'react';

const baseURL = `https://api.openweathermap.org/data/2.5/weather`;

const Weather = (props) => {
    const key = 'd36a46dc51df18c7b4c1110ab98d8e5f';
    let url = `${baseURL}?lat=39.7914&lon=-86.1480&appid=${key}`;
    const [temp, setTemp] = useState('Loading...');
    let celsius = Math.floor (temp - 273);
    let fahrenheit = Math.floor (celsius * (9/5) + 32);


async function handleFetch() {

    try{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.main.temp);
        setTemp(data.main.temp);

    } catch (err) {
        console.error(err);
    }}

useEffect(() => {
        handleFetch();
    }, []);

    return ( 
    <div>
        <h1>Indianapolis</h1>
        <p>Temperature: {fahrenheit}ºF</p>
        <p>Temperature: {celsius}ºC</p>
            <button>Change Unit</button>
    </div> 
    );
    }
    
export default Weather;