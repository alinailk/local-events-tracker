<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/cors.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // ID'yi URL'den alır.
    parse_str($_SERVER['QUERY_STRING'], $params);
    $id = $params['id'] ?? null;

    if (!$id) {
        http_response_code(400);
        echo json_encode(['message' => 'Etkinlik ID gerekli.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM events WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Etkinlik başarıyla silindi.']);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Silme işlemi başarısız.']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Veritabanı hatası.', 'error' => $e->getMessage()]);
    }
}
?>