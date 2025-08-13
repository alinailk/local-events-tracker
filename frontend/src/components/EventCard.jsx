import React from 'react';
import { deleteEvent } from '../services/eventService';
import { FiTrash2, FiEdit, FiMapPin, FiCalendar, FiTag } from 'react-icons/fi';

function EventCard({ event, onDelete, onEdit }) {
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

    // Kategoriye göre renk
    const categoryColors = {
        Eğlence: 'bg-purple-100 text-purple-700',
        Eğitim: 'bg-green-100 text-green-700',
        Teknik: 'bg-gray-100 text-gray-700',
        Yazılım: 'bg-blue-100 text-blue-700',
        Teknoloji: 'bg-indigo-100 text-indigo-700',
        Sanat: 'bg-pink-100 text-pink-700',
        Spor: 'bg-orange-100 text-orange-700',
        Kültür: 'bg-yellow-100 text-yellow-700',
        Müzik: 'bg-red-100 text-red-700',
        Diğer: 'bg-slate-100 text-slate-700'
    };

    const categoryClass = categoryColors[event.category] || 'bg-blue-100 text-blue-700';

    return (
        <div className="relative bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition group border border-gray-100 hover:border-blue-300">
            {/* Hover'da ikonlar */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-700"
                    title="Sil"
                >
                    <FiTrash2 size={18} />
                </button>
                <button
                    onClick={() => onEdit(event)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Düzenle"
                >
                    <FiEdit size={18} />
                </button>
            </div>

            {/* Başlık */}
            <h3 className="text-2xl font-bold text-blue-700 mb-2">{event.title}</h3>

            {/* Açıklama */}
            <p className="text-gray-700 text-sm mb-4">{event.description}</p>

            {/* Bilgiler */}
            <div className="text-sm text-gray-600 space-y-2">
                <p className="flex items-center gap-2">
                    <FiMapPin className="text-blue-500" />
                    <span>{event.location}</span>
                </p>
                <p className="flex items-center gap-2">
                    <FiCalendar className="text-green-500" />
                    <span>{event.date}</span>
                </p>
                <p className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryClass}`}>
                    <FiTag className="inline mr-1" />
                    {event.category}
                </p>
            </div>
        </div>
    );
}

export default EventCard;
