import React, { useState } from 'react';
import { createEvent } from '../services/eventService';

function EventForm({ onEventCreated }) {
    const [form, setForm] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        category: ''
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        // Basit validasyon
        if (!form.title || !form.location || !form.date || !form.category || !form.description) {
            alert("Lütfen tüm alanları eksiksiz doldurun!");
            return;
        }

        const today = new Date().toISOString().split("T")[0];
        if (form.date < today) {
            alert("Etkinlik tarihi geçmiş bir tarih olamaz!");
            return;
        }

        const res = await createEvent(form);
        if (res.success) {
            onEventCreated();
            setForm({ title: '', location: '', date: '', category: '', description: '' });
        } else {
            alert("Kayıt hatası: " + res.error);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Yeni Etkinlik Ekle</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="title" value={form.title} onChange={handleChange} placeholder="Başlık" className="border p-2 rounded" required />
                <input name="location" value={form.location} onChange={handleChange} placeholder="Konum" className="border p-2 rounded" required />
                <input name="date" value={form.date} onChange={handleChange} type="date" className="border p-2 rounded" required />
                <input name="category" value={form.category} onChange={handleChange} placeholder="Kategori" className="border p-2 rounded" required />
            </div>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Açıklama" className="border p-2 rounded w-full mt-4" required />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 transition">Ekle</button>
        </form>
    );
}

export default EventForm;
