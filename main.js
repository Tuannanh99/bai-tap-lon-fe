fetch(ITEM_API)

.then(res=>res.json())

.then(data=>{

let html="";

data.forEach(item=>{

html+=`

<div class="col-md-4">

<div class="card">

<img src="${item.image}" class="card-img-top">

<div class="card-body">

<h5>${item.name}</h5>

<p>${item.price} VNĐ</p>

<button
class="btn btn-success"
onclick="order('${item.name}')">

Đặt món

</button>

</div>

</div>

</div>

`;

});

document.getElementById("productList").innerHTML=html;

});

function order(name){

let customer=prompt("Tên của bạn");

let quantity=prompt("Số lượng");

fetch(ORDER_API,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

customer:customer,

item:name,

quantity:quantity,

status:"Mới"

})

})

.then(()=>{

alert("Đặt món thành công");

});

}