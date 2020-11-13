<?php
    require_once 'login.php';
    
    // Подключение к БД и проверка соединения
    $conn = new mysqli($servername, $username, $password, $database);
    if ($conn->connect_error)
        die("Connection failed: " . mysqli_connect_error());

    // Используется "подготовленные запросы" для защиты от SQL-инъекций 
    $statement = $conn->prepare('DELETE FROM cities WHERE id=?');
    $statement->bind_param('i', $id);

    // Подстановка данных
    $id = $_POST['id'];

    // Исполнение запроса и проверка успеха
    $statement->execute();
    printf("%d Row inserted.\n", $statement->affected_rows);
    $statement->close();
    $conn->close();
?>