//===============================
// Hiển thị danh sách món ăn
//===============================

function loadItems() {

    fetch(ITEM_API)

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            showItems(data);
        });

}
function showItems(list) {

    var html = "";

    for (var i = 0; i < list.length; i++) {

        html += `

<tr>

<td>${list[i].id}</td>

<td>${list[i].name}</td>

<td>${list[i].price}</td>

<td>${list[i].restaurant}</td>

<td>

<button
class="btn btn-warning btn-sm"
onclick="editItem('${list[i].id}')">

Sửa

</button>

</td>

<td>

<button
class="btn btn-danger btn-sm"
onclick="deleteItem('${list[i].id}')">

Xóa

</button>

</td>

</tr>

`;

    }

    document.getElementById("tableFood").innerHTML = html;

}
function showItems(list) {

    var html = "";

    for (var i = 0; i < list.length; i++) {

        html += `

<tr>

<td>${list[i].id}</td>

<td>${list[i].name}</td>

<td>${list[i].price}</td>

<td>${list[i].restaurant}</td>

<td>

<button
class="btn btn-warning btn-sm"
onclick="editItem('${list[i].id}')">

Sửa

</button>

</td>

<td>

<button
class="btn btn-danger btn-sm"
onclick="deleteItem('${list[i].id}')">

Xóa

</button>

</td>

</tr>

`;

    }

    document.getElementById("tableFood").innerHTML = html;

}
loadItems();
function addItem() {

    var item = {

        name: document.getElementById("name").value,

        price: document.getElementById("price").value,

        restaurant: document.getElementById("restaurant").value,

        image: document.getElementById("image").value,

        description: document.getElementById("description").value

    };

    fetch(ITEM_API, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(item)

    })

    .then(function () {

        alert("Thêm thành công");

        clearForm();

        loadItems();

    });

}
function deleteItem(id) {

    var check = confirm("Bạn có muốn xóa không?");

    if (check == false) {

        return;

    }

    fetch(ITEM_API + "/" + id, {

        method: "DELETE"

    })

    .then(function () {

        loadItems();

    });

}
var updateId = "";
function editItem(id) {

    updateId = id;

    fetch(ITEM_API + "/" + id)

        .then(function (response) {

            return response.json();

        })

        .then(function (item) {

            document.getElementById("name").value = item.name;

            document.getElementById("price").value = item.price;

            document.getElementById("restaurant").value = item.restaurant;

            document.getElementById("image").value = item.image;

            document.getElementById("description").value = item.description;

        });

}
<button
class="btn btn-primary"
onclick="updateItem()">

Cập nhật

</button>
function updateItem() {

    var item = {

        name: document.getElementById("name").value,

        price: document.getElementById("price").value,

        restaurant: document.getElementById("restaurant").value,

        image: document.getElementById("image").value,

        description: document.getElementById("description").value

    };

    fetch(ITEM_API + "/" + updateId, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(item)

    })

    .then(function () {

        alert("Cập nhật thành công");

        clearForm();

        loadItems();

    });

}
function clearForm() {

    document.getElementById("name").value = "";

    document.getElementById("price").value = "";

    document.getElementById("restaurant").value = "";

    document.getElementById("image").value = "";

    document.getElementById("description").value = "";

}
function loadOrders() {

    fetch(ORDER_API)

        .then(function (response) {

            return response.json();

        })

        .then(function (data) {

            showOrders(data);

        });

}
function showOrders(list) {

    var html = "";

    for (var i = 0; i < list.length; i++) {

        html += `

<tr>

<td>${list[i].customer}</td>

<td>${list[i].phone}</td>

<td>${list[i].item}</td>

<td>${list[i].quantity}</td>

<td>

<select
class="form-select"

onchange="changeStatus('${list[i].id}',this.value)">

<option ${list[i].status=="Mới"?"selected":""}>Mới</option>

<option ${list[i].status=="Đang làm"?"selected":""}>Đang làm</option>

<option ${list[i].status=="Đang giao"?"selected":""}>Đang giao</option>

<option ${list[i].status=="Hoàn thành"?"selected":""}>Hoàn thành</option>

</select>

</td>

</tr>

`;

    }

    document.getElementById("tableOrder").innerHTML = html;

}
function changeStatus(id, status) {

    fetch(ORDER_API + "/" + id)

        .then(function (response) {

            return response.json();

        })

        .then(function (order) {

            order.status = status;

            fetch(ORDER_API + "/" + id, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(order)

            });

        });

}
loadItems();

loadOrders();