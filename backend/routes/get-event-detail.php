<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/cors.php';

// ID parametresi URL'den alınır.
if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Etkinlik ID belirtilmedi'
    ]);
    exit;
}

$id = intval($_GET['id']); // Güvenlik için sayıya çeviriyoruz.

$sql = "SELECT * FROM events WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->execute([':id' => $id]);
$event = $stmt->fetch(PDO::FETCH_ASSOC);

if ($event) {
    echo json_encode([
        'success' => true,
        'data' => $event
    ]);
} else {
    http_response_code(404);
    echo json_encode([
        'success' => false,
        'error' => 'Etkinlik bulunamadı'
    ]);
}
?>