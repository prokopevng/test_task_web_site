var data = {};          // Здесь хранятся все данные из таблицы "cities"
get_cities_db();        // При загрузке страницы, надо сразу отобразить таблицу


function open_add_city_form() {
    // Открывает форму и настраивает ее на выполнение функции формы для
    // ввода информации о новом город.
    document.querySelector("#captionCityForm").innerHTML = "Добавить город";
    document.querySelector("#submitBtnCityForm").setAttribute("onClick", "insert_city_db()");
    document.querySelector("#cityForm").style.display = "block";
}

function close_city_form() {
    // Закрывапет форму для ввода информации о городе
    document.querySelector("#cityForm").style.display = "none";
}

function open_update_city_form(index) {
    // Открывает форму и настраивает ее на выполнение функции формы для
    // изменения информации о  городе. Все поля данными о редактируемом городе
    document.querySelector("#captionCityForm").innerHTML = "Изменить город";
    document.querySelector("#nameValue").value = data[index].name;
    document.querySelector("#populationValue").value = data[index].population;
    document.querySelector("#submitBtnCityForm").setAttribute("onClick", "update_city_db(" + String(data[index].id) + ")");
    document.querySelector("#cityForm").style.display = "block";
}

function delete_cities_form(index) {
    // Спрашивает у пользователя, действительно ли он хочет удалить выбранный город.
    // Если пользователь согласен, город удаляется
    //
    // Параметр index хранит позицию данного города в массиве data  
    if (confirm("Вы уверены, что хотите удалить город " + data[index].name + "?"))
        delete_city_db(data[index].id);
}

function draw_cities_table() {
    // Рисует таблицу и заполняет ее данными о городах

    // Создание элемента table
    var owner_div = document.getElementById("table_cities");
    if (owner_div.childNodes.length != 0)
        owner_div.removeChild(owner_div.childNodes[0]);
    var table = document.createElement('table');
    table.setAttribute('border','1');
    table.setAttribute('width','100%');
    
    var header = table.createTHead();
    var row = header.insertRow(0);
    var cell = row.insertCell(0);
    // Заполнение шапки таблицы

    cell.setAttribute('align','center');
    cell.innerHTML = "<b>Наименование города</b>";
    cell = row.insertCell(1);
    cell.setAttribute('align','center');
    cell.innerHTML = "<b>Население</b>";
    

    // В данном цикле выполняется построчная отрисовка таблицы
    for (row_index = 0; row_index < data.length; row_index++) {
        row = table.insertRow(row_index+1);

        // Ячейка с названием города
        cell = row.insertCell(0);
        cell.setAttribute('align','center');
        cell.appendChild(document.createTextNode(data[row_index].name));

        // Ячейка с населением города
        cell = row.insertCell(1);
        cell.setAttribute('align','center');
        cell.appendChild(document.createTextNode(data[row_index].population));

        // Ячейка для кнопки добавления и удаления записи о городе
        cell = row.insertCell(2);
        cell.setAttribute('align','center');

        // Создание кнопки для редактирования записи о городе
        update_btn = document.createElement('button');
        update_btn.setAttribute('type','button');
        update_btn.setAttribute('onclick','open_update_city_form(' + String(row_index) + ')');
        update_btn.innerHTML = "Изменить";
        cell.appendChild(update_btn);

        // Создание кнопки для удаления записи о городе
        del_btn = document.createElement('button');
        del_btn.setAttribute('type','button');
        del_btn.setAttribute('onclick','delete_cities_form(' + String(row_index) + ')');
        del_btn.innerHTML = "Удалить";        
        cell.appendChild(del_btn);
    }
    document.getElementById("table_cities").appendChild(table);
}

// Отправляет запрос к БД на получение информации о городах
function get_cities_db() {
    $.ajax({
        url: '/api/get_cities_from_db.php',
        type: 'GET',
        success: function (result) {
            data = jQuery.parseJSON(result);
            draw_cities_table();         
        }
    });
    
}
 
// Отправляет запрос к БД на добавлении города
function insert_city_db() {
    $.ajax({
        url: '/api/insert_city_db.php',
        type: 'POST',
        dataType: 'json',
        data: {
            'name': document.getElementById("nameValue").value,
            'population': document.getElementById("populationValue").value
        },
        success: function (data) {
            alert(data);
        }
    });
    close_city_form();
    get_cities_db();
}

// Отправляет запрос к БД на обновлении информации о городе по его индексу в БД
function update_city_db(id) {    
    $.ajax({
        url: '/api/update_city_db.php',
        type: 'POST',
        dataType: 'json',
        data: {
            'id': id,
            'name': document.getElementById("nameValue").value,
            'population': document.getElementById("populationValue").value
        },
        success: function (data) {
            alert(data);
        }
    });
    close_city_form();
    get_cities_db();
}

// Отправляет запрос к БД на удаление информации о городе по его индексу в БД
function delete_city_db(id) {    
    $.ajax({
        url: '/api/delete_city_db.php',
        type: 'POST',
        dataType: 'json',
        data: {
            'id': id
        },
        success: function (data) {
            alert(data);
        }
    });
    close_city_form();
    get_cities_db();
}