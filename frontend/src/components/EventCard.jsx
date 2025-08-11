import React from 'react';
import { deleteEvent } from '../services/eventService';
import { FiTrash2 } from 'react-icons/fi'; // Modern çöp kutusu ikonu

function EventCard({ event, onDelete }) {
    const handleDelete = async () => {
        const confirmed = window.confirm("Bu etkinliği silmek istediğine emin misin?");
        if (confirmed) {
            const res = await deleteEvent(event.id);
            if (res.success) {
                onDelete();
            } else {
                alert("Silme hatası: " + res.error);
            }
        }
    };

    return (
        <div className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            {/* Sil Butonu - Modern ikon */}
            <button
                onClick={handleDelete}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                title="Sil"
            >
                <FiTrash2 size={18} />
            </button>

            <h3 className="text-xl font-semibold text-blue-700 mb-2">{event.title}</h3>
            <p className="text-gray-700 text-sm mb-2">{event.description}</p>

            <div className="text-sm text-gray-600 space-y-1">
                <p><strong>📍 Yer:</strong> {event.location}</p>
                <p><strong>📅 Tarih:</strong> {event.date}</p>
                <p><strong>🏷️ Kategori:</strong> {event.category}</p>
            </div>
        </div>
    );
}

export default EventCard;
