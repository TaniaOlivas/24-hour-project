import React, { useState, useEffect } from 'react';
import Moment from 'moment';

const baseURL = 'https://app.ticketmaster.com/discovery/v2/events.json';
const key = 'NBPgGHYWCXQ2SmBwuPu60TIwceuXMODW';

const TicketMaster = (props) => {
  const formatDate = Moment().format('MM-DD-YYYY');

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
        <tr key={index}>
          <th scope="row">{event.name}</th>
          <th scope="row">{event.dates.start.localDate}</th>
          <th scope="row">{event.dates.start.localTime}</th>
        </tr>
      );
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{eventMapper()}</tbody>
      </table>
    </div>
  );
};

export default TicketMaster;
