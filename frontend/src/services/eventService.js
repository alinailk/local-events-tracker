const BASE_URL = 'http://localhost/local-events-tracker/backend/routes';

// Etkinlik listeleme fonksiyonu.
export async function getEvents() {
    try {
        const res = await fetch(`${BASE_URL}/get-event.php`);
        return await res.json();
    } catch (err) {
        console.error("Veri çekme hatası:", err);
        return { success: false, error: err.message };
    }
}

// Etkinlik ekleme fonksiyonu.
export async function createEvent(data) {
    try {
        const res = await fetch(`${BASE_URL}/create-event.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await res.json();
    } catch (err) {
        console.error("Etkinlik ekleme hatası:", err);
        return { success: false, error: err.message };
    }
}

// Etkinlik silme fonksiyonu.
export async function deleteEvent(id) {
    try {
        const res = await fetch(`${BASE_URL}/delete-event.php?id=${id}`, {
            method: 'DELETE'
        });
        return await res.json();
    } catch (err) {
        console.error("Etkinlik silme hatası:", err);
        return { success: false, error: err.message };
    }
}
