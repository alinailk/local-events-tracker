import React from 'react';

function EventCard({ event }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-all border border-gray-200">
            <h2 className="text-xl font-semibold text-blue-600">{event.title}</h2>
            <p className="text-gray-700 mt-2">{event.description}</p>
            <div className="mt-4 text-sm text-gray-500">
                <span className="mr-4">📍 {event.location}</span>
                <span>📅 {event.date}</span>
            </div>
            <div className="mt-2 text-xs text-gray-400 italic">
                Kategori: {event.category}
            </div>
        </div>
    );
}

export default EventCard;
