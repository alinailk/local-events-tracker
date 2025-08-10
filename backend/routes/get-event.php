<?php

// Tarayıcıya JSON döneceğimizi bildiriyoruz.
header('Content-Type: application/json');

// Veritabanı bağlantısını çağırıyoruz.
require_once __DIR__ . '/../config/db.php';

// CORS dosyasını çağırıyoruz.
require_once __DIR__ . '/../config/cors.php';

try {
    // Etkinlikleri tarihe göre sıralayan SQL sorgusu.
    $sql = "SELECT * FROM events ORDER BY date ASC";

    // Sorguyu hazırlayıp çalıştırıyoruz.
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Sonuçları dizi olarak alıyoruz.
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Başarılı yanıtı döndürüyoruz.
    echo json_encode([
        "success" => true,
        "data" => $events
    ]);
} catch (Exception $e) {
    // Hata durumunda başarısız yanıtı döndürüyoruz.
    echo json_encode([
        "success" => false,
        "error" => "Etkinlikler alınırken bir hata oluştu."
    ]);
}

?>