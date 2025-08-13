import React, { useState, useEffect } from 'react';
import { updateEvent } from '../services/eventService';

function UpdateModal({ event, onClose, onUpdated }) {
    const [form, setForm] = useState({
        title: '',
        description: '',
        location: '',
        date: '',
        category: ''
    });

    const categoryOptions = [
        "Eğlence",
        "Eğitim",
        "Teknik",
        "Yazılım",
        "Teknoloji",
        "Sanat",
        "Spor",
        "Kültür",
        "Müzik",
        "Diğer"
    ];

    useEffect(() => {
        if (event) {
            setForm({
                title: event.title,
                description: event.description,
                location: event.location,
                date: event.date,
                category: event.category
            });
        }
    }, [event]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!form.title || !form.location || !form.date || !form.category || !form.description) {
            alert("Lütfen tüm alanları eksiksiz doldurun!");
            return;
        }

        const today = new Date().toISOString().split("T")[0];
        if (form.date < today) {
            alert("Etkinlik tarihi geçmiş bir tarih olamaz!");
            return;
        }

        const res = await updateEvent(event.id, form);
        if (res.success) {
            onUpdated();
            onClose();
        } else {
            alert("Güncelleme hatası: " + res.error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl">✖</button>
                <h2 className="text-xl font-bold mb-4 text-blue-700">Etkinliği Güncelle</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input name="title" value={form.title} onChange={handleChange} placeholder="Başlık" className="w-full border p-2 rounded" required />
                    <input name="location" value={form.location} onChange={handleChange} placeholder="Konum" className="w-full border p-2 rounded" required />
                    <input name="date" value={form.date} onChange={handleChange} type="date" className="w-full border p-2 rounded" required />

                    {/* Kategori Select */}
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    >
                        <option value="" disabled>Kategori Seçin</option>
                        {categoryOptions.map((cat, i) => (
                            <option key={i} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <textarea name="description" value={form.description} onChange={handleChange} placeholder="Açıklama" className="w-full border p-2 rounded" required />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Güncelle</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateModal;
