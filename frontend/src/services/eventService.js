const BASE_URL = 'http://localhost/local-events-tracker/backend/routes';

export async function getEvents() {
    try {
        const res = await fetch(`${BASE_URL}/get-event.php`);
        return await res.json();
    } catch (err) {
        console.error("Veri çekme hatası:", err);
        return { success: false, error: err.message };
    }
}

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
