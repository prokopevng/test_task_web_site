<?php
    require_once 'login.php';

    // Подключение к БД и проверка соединения
    $conn = new mysqli($servername, $username, $password, $database);    
    if ($conn->connect_error) {
        die("Connection failed: " . mysqli_connect_error());
    }

    // В данном месте можно не использовать prepared statements
    // так как в этот SQL-запрос пользователь не вносит данные
    $sql = 'SELECT * FROM cities';
    $result = $conn->query($sql);
    if (!$result) die("Fatal Error");

    // Данные, полученные из БД преобразовываются в массив ассоциативных масивов
    $rows = $result->num_rows;
    $arrResult = array();
    for ($index = 0; $index < $rows; ++$index) {
        $row = $result->fetch_array(MYSQLI_ASSOC);

        $arrResult[$index] = $row;
    }

    // Отправляем данные в формате JSON
    echo json_encode($arrResult);

    $result->close();
    $conn->close();
?>