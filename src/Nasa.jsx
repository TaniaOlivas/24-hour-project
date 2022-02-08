import React, { useState, useEffect } from 'react';
const Nasa = (props) => {
  const [picture, setPicture] = useState('');

  async function handleFetch() {
    const url = `https://api.nasa.gov/planetary/earth/imagery?lon=${props.lng}&lat=${props.lat}&date=2014-02-01&api_key=8Mb2e39Rd5d7S01R09oPasEQgdLaopWhrKM10gu1&dim=.03`;

    try {
      const response = await fetch(url);
      const data = await response.blob();
      setPicture(URL.createObjectURL(data));
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
      <form id="nasa">
        <h1>Hello from Nasa</h1>
        <img id="nasaImg" src={picture} width={300} height={300} />
      </form>
    </div>
  );
};

export default Nasa;
