<?php

// Tarayıcıya JSON döneceğimizi bildiriyoruz.
header('Content-Type: application/json');

// Veritabanı bağlantısını çağırıyoruz.
require_once __DIR__ . '/../config/db.php';

// Etkinlikleri tarihe göre sıralayan SQL sorgusu.
$sql = "SELECT * FROM events ORDER BY date ASC";

// Sorguyu hazırlayıp çalıştırıyoruz.
$stmt = $pdo->prepare($sql);
$stmt->execute();

// Sonuçları dizi olarak alıyoruz.
$events = $stmt->fetchAll(PDO::FETCH_ASSOC);

// JSON formatında çıktıyı döndürüyoruz.
echo json_encode($events);

?>