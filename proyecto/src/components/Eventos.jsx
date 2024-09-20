import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Eventos = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await axios.get('/api/events');
            setEvents(response.data);
        };
        fetchEvents();
    }, []);

    return (
        <div>
            <h1>Eventos</h1>
            <div className="event-list">
                {events.map((event, index) => (
                    <div key={index} className="event-item">
                        <img src={event.image} alt={event.title} />
                        <h3>{event.title}</h3>
                        <p>{event.date} - {event.location}</p>
                        <a href={event.link} target="_blank" rel="noopener noreferrer">Ver más</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Eventos;
