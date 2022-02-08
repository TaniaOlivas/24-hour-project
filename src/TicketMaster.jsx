import React, { useState, useEffect } from 'react';

const baseURL = 'https://app.ticketmaster.com/discovery/v2/events.json';
const key = 'NBPgGHYWCXQ2SmBwuPu60TIwceuXMODW';

const TicketMaster = (props) => {

  const [events, setEvents] = useState([]);

  async function handleFetch() {
    let url = `${baseURL}?latlong=${props.lat},${props.lng}&apikey=${key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data._embedded.events);
      setEvents(data._embedded.events);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (props.lat && props.lng) {
      handleFetch();
    }
  }, [props.lat, props.lng]);

  const eventMapper = () => {
    return events.map((event, index) => {
      return (
        <tr id='table' key={index}>
          <th className='row' scope="row">{event.name}</th>
          <th className='row' scope="row">{event.dates.start.localDate}</th>
          <th className='row' scope="row">{event.dates.start.localTime}</th>
        </tr>
      );
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr id='eventHeaders'>
            <th><h2>Name</h2></th>
            <th><h2>Date</h2></th>
            <th><h2>Time</h2></th>
          </tr>
        </thead>
        <tbody>{eventMapper()}</tbody>
      </table>
    </div>
  );
};

export default TicketMaster;
