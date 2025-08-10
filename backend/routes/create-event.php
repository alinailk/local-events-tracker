<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/cors.php';

// JSON verisini alır.
$input = json_decode(file_get_contents('php://input'), true);

// Zorunlu alanları kontrol eder.
if (
    !isset($input['title']) ||
    !isset($input['description']) ||
    !isset($input['location']) ||
    !isset($input['date']) ||
    !isset($input['category'])
) {
    http_response_code(400);
    echo json_encode(['error' => 'Eksik alanlar var']);
    exit;
}

// SQL sorgusu.
$sql = "INSERT INTO events (title, description, location, date, category)
        VALUES (:title, :description, :location, :date, :category)";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':title' => $input['title'],
    ':description' => $input['description'],
    ':location' => $input['location'],
    ':date' => $input['date'],
    ':category' => $input['category']
]);

echo json_encode(['message' => 'Etkinlik başarıyla eklendi']);
?>