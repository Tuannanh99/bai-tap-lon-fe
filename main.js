function loadItems() {

    fetch(ITEM_API)

        .then(function (response) {

            return response.json();

        })

        .then(function (data) {

            showItems(data);

        })

        .catch(function () {

            alert("Không thể tải dữ liệu!");

        });

}
function showItems(list) {

    var html = "";

    for (var i = 0; i < list.length; i++) {

        html += `

<div class="col-md-4">

<div class="card">

<img src="${list[i].image}" class="card-img-top">

<div class="card-body">

<h4 class="card-title">

${list[i].name}

</h4>

<p class="price">

${list[i].price} VNĐ

</p>

<p class="restaurant">

${list[i].restaurant}

</p>

<p class="description">

${list[i].description}

</p>

<button
class="btn btn-success"

onclick="orderFood('${list[i].name}')">

Đặt món

</button>

</div>

</div>

</div>

`;

    }

    document.getElementById("foodList").innerHTML = html;

}
loadItems();
document
.getElementById("search")
.addEventListener("keyup", searchFood);

function searchFood() {

    var keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    fetch(ITEM_API)

        .then(function (response) {

            return response.json();

        })

        .then(function (data) {

            var result = [];

            for (var i = 0; i < data.length; i++) {

                if (data[i].name.toLowerCase().includes(keyword)) {

                    result.push(data[i]);

                }

            }

            showItems(result);

        });

}
function orderFood(foodName) {

    var customer = prompt("Nhập tên của bạn");

    if (customer == null || customer == "") {

        return;

    }

    var phone = prompt("Nhập số điện thoại");

    var quantity = prompt("Nhập số lượng");

    var order = {

        customer: customer,

        phone: phone,

        item: foodName,

        quantity: quantity,

        status: "Mới"

    };

    fetch(ORDER_API, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(order)

    })

        .then(function () {

            alert("Đặt món thành công!");

        });

}