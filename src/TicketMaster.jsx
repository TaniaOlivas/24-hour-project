import React, { useState } from 'react';

const baseURL =
  'https://app.ticketmaster.com/discovery/v2/events.json?latlong=34.0522,-118.2437';
const key = 'NBPgGHYWCXQ2SmBwuPu60TIwceuXMODW';

const TicketMaster = (props) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  async function handleFetch() {
    let url = `${baseURL}&apikey=${key}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data._embedded.events[0].dates.start.localDate);
      setName(data._embedded.events[0].name);
      setDate(data._embedded.events[0].dates.start.localDate);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div>
      <h1>Hello from TicketMaster</h1>
      <button onClick={handleFetch}>Click here for Event!</button>
    </div>
  );
};

export default TicketMaster;
