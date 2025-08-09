<?php
require_once __DIR__ . '/config/db.php';

if ($pdo) {
    echo "Veritabanı bağlantısı başarılı!";
} else {
    echo "Bağlantı başarısız.";
}
?>