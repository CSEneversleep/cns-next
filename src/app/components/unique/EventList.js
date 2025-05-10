// @/components/unique/main/EventList.js

'use client';

// React
import { useEffect, useState } from 'react';
// Styles
import './eventlist.css';

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/value/event');
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div id="event-list">
      {events.map((event) => (
        <a key={event.id} href={`/${event.id}`} className="event-link">
          {event.eventname}
        </a>
      ))}
    </div>
  );
}