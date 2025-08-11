import React, { useEffect, useState } from 'react';
import { getEvents } from '../services/eventService';
import EventCard from '../components/EventCard';
import EventForm from '../components/EventForm'; // ✅ Form bileşeni eklendi

function HomePage() {
    const [events, setEvents] = useState([]);

    const fetchEvents = () => {
        getEvents().then(res => {
            if (res.success) {
                setEvents(res.data);
            } else {
                console.error(res.error);
            }
        });
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Etkinlikler</h1>

            <EventForm onEventCreated={fetchEvents} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map(event => (
                    <EventCard key={event.id} event={event} onDelete={fetchEvents} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;
