import React, { useEffect } from 'react';

const Weather = (props) => {

async function handleFetch() {

    try{

    } catch (err) {
        console.error(err);
    }}

useEffect(() => {
        handleFetch();
    }, []);

    return ( 
    <div>
        <h1>Welcome to Weather</h1>
    </div> 
    );
    }
    
export default Weather;