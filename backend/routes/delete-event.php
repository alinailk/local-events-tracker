<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/cors.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str($_SERVER['QUERY_STRING'], $params);
    $id = $params['id'] ?? null;

    // ID'ye göre silme işlemi kontrolü.
    if (!$id) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Etkinlik ID gerekli.'
        ]);
        exit;
    }

    try {
        // Soft delete: deleted_at alanını günceller.
        $stmt = $pdo->prepare("UPDATE events SET deleted_at = NOW() WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'data' => 'Etkinlik soft delete ile işaretlendi.'
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Silme işlemi başarısız.'
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
}
?>