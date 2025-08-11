<?php

header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/cors.php';

try {
    // Soft delete filtreli SQL sorgusu
    $sql = "SELECT * FROM events WHERE deleted_at IS NULL ORDER BY date ASC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "data" => $events
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "error" => "Etkinlikler alınırken bir hata oluştu."
    ]);
}

?>