<?php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/cors.php';

// PUT isteğiyle gelen veriyi alır.
$input = json_decode(file_get_contents('php://input'), true);

// Gerekli alanları kontrol eder.
if (
    !isset($input['id']) ||
    !isset($input['title']) ||
    !isset($input['description']) ||
    !isset($input['date']) ||
    !isset($input['location']) ||
    !isset($input['category'])
) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Eksik veri gönderildi.'
    ]);
    exit;
}

$id = $input['id'];
$title = $input['title'];
$description = $input['description'];
$date = $input['date'];
$location = $input['location'];
$category = $input['category'];

try {
    $stmt = $pdo->prepare("UPDATE events 
        SET title = :title, 
            description = :description, 
            date = :date, 
            location = :location, 
            category = :category 
        WHERE id = :id");

    $stmt->execute([
        ':title' => $title,
        ':description' => $description,
        ':date' => $date,
        ':location' => $location,
        ':category' => $category,
        ':id' => $id
    ]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            'success' => true,
            'data' => 'Etkinlik başarıyla güncellendi.'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Etkinlik bulunamadı veya değişiklik yapılmadı.'
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Veritabanı hatası.',
        'details' => $e->getMessage()
    ]);
}
?>