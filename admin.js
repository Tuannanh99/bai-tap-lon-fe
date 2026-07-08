function load(){

fetch(ITEM_API)

.then(res=>res.json())

.then(data=>{

let html="";

data.forEach(item=>{

html+=`

<tr>

<td>${item.name}</td>

<td>${item.price}</td>

<td>

<button

class="btn btn-danger"

onclick="remove('${item.id}')">

Xóa

</button>

</td>

</tr>

`;

});

document.getElementById("table").innerHTML=html;

});

}

load();
function addItem(){

let name=document.getElementById("name").value;

let price=document.getElementById("price").value;

let image=document.getElementById("image").value;

fetch(ITEM_API,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

name:name,

price:price,

image:image

})

})

.then(()=>{

load();

});

}
function remove(id){

fetch(ITEM_API+"/"+id,{

method:"DELETE"

})

.then(()=>{

load();

});

}