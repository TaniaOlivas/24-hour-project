import React, { useState, useEffect } from 'react';
import { Button, Table } from 'reactstrap';

const baseURL = 'https://app.ticketmaster.com/discovery/v2/events.json';
const key = process.env.REACT_APP_TICKET_API_KEY;

const TicketMaster = (props) => {
  const [events, setEvents] = useState([]);

  async function handleFetch() {
    let url = `${baseURL}?latlong=${props.lat},${props.lng}&apikey=${key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
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
      const formatDate = () => {
        let dates = new Date(event.dates.start.localDate);
        let formattedDates = dates.toLocaleDateString();
        return formattedDates;
      };

      const formatTime = () => {
        let times = new Date(event.dates.start.dateTime);
        let formattedTime = times.toLocaleTimeString();
        return formattedTime;
      };
      return (
        <tr key={index}>
          <td className="tableRow p-0">
            <a href={event.url}>
              <Button className="ticketbtn" style={{ fontSize: '12px' }}>
                Buy Tickets
              </Button>
            </a>
          </td>
          <td className="p-0">{event.name}</td>
          <td className="p-0">{formatDate()}</td>
          <td className="p-0">{formatTime()}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <div>
        <Table hover>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>{eventMapper()}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default TicketMaster;
