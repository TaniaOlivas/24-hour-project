import React, { useState, useEffect } from 'react';

const baseURL = 'https://app.ticketmaster.com/discovery/v2/events.json';
const key = 'NBPgGHYWCXQ2SmBwuPu60TIwceuXMODW';

const TicketMaster = (props) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  async function handleFetch() {
    let url = `${baseURL}?latlong=${props.lat},${props.lng}&apikey=${key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data._embedded.events[0].dates.start.localTime);
      setName(data._embedded.events[0].name);
      setDate(data._embedded.events[0].dates.start.localDate);
      setTime(data._embedded.events[0].dates.start.localTime);
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
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Event: </th>
            <td>{name}</td>
            <td>{date}</td>
            <td>{time}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleFetch}>Click here for Event!</button>
    </div>
  );
};

export default TicketMaster;
