import React from 'react';
import Nasa from "./Nasa";
import Weather from './Weather';
import './App.css';

function App() {



  return (
    <div>
      <h1>Develop Branch</h1>
      <Nasa />
      <nav id='header'>
        <h1>What's Going on in Your Area</h1>
      </nav>
      <Weather/>
    </div>
  );
}

export default App;
