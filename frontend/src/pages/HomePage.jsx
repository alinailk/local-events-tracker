import React, { useEffect, useState } from 'react';
import { getEvents } from '../services/eventService';
import EventCard from '../components/EventCard';
import EventForm from '../components/EventForm';
import UpdateModal from '../components/UpdateModal';
import { FiPlus, FiX } from 'react-icons/fi';
import Header from '../components/Header/Header';
import './HomePage.css';
import Footer from '../components/Footer/Footer';

function HomePage() {
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

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
        <>
            <Header /> {/* Sayfanın en üstüne Header bileşeni eklendi */}

            <div className="page-container max-w-4xl mx-auto">
                {/* Aç/Kapa Butonu */}
                <div className="flex justify-center mb-4">
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        {showForm ? <FiX size={18} /> : <FiPlus size={18} />}
                        {showForm ? "Formu Kapat" : "Yeni Etkinlik Ekle"}
                    </button>
                </div>

                {/* Açılır Form */}
                <div
                    className={`transition-all duration-700 ease-in-out overflow-hidden ${showForm ? 'max-h-[1000px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'
                        }`}
                >
                    <EventForm onEventCreated={fetchEvents} />
                </div>

                {/* Etkinlik Listesi Başlığı */}
                <h2 className="text-xl font-semibold text-gray-800 mt-10 mb-4 border-b pb-2">
                    Kayıtlı Etkinlikler
                </h2>

                {/* Etkinlik Listesi */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {events.map(event => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onDelete={fetchEvents}
                            onEdit={setEditingEvent}
                        />
                    ))}
                </div>

                {/* Güncelleme Modalı */}
                {editingEvent && (
                    <UpdateModal
                        event={editingEvent}
                        onClose={() => setEditingEvent(null)}
                        onUpdated={fetchEvents}
                    />
                )}
            </div>
            <Footer />
        </>
    );
}

export default HomePage;
