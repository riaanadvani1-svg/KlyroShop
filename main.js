let cart = JSON.parse(localStorage.klyro || "[]");

function add(id){

let product = {};

if(id===1){
product={
name:"Black Flame Hoodie",
price:15,
size:document.getElementById("size1").value,
color:document.getElementById("color1").value
};
}

if(id===2){
product={
name:"I Love Pizza Hoodie",
price:15,
size:document.getElementById("size2").value,
color:document.getElementById("color2").value
};
}

cart.push(product);

localStorage.klyro = JSON.stringify(cart);
alert("Added to cart!");
}

// CHECKOUT PAGE
if(document.getElementById("cart")){
let total=0;
cart.forEach(x=>{
total+=x.price;
document.getElementById("cart").innerHTML+=`
<div style="padding:8px;border-bottom:1px solid #333">
${x.name} | ${x.size} | ${x.color} — $${x.price}
</div>`;
});
document.getElementById("total").innerText=total;
}

// STRIPE PAYMENT
function pay(){
location.href="https://buy.stripe.com/test_00wdR972M3gt4NF2vQ5Vu00";
}
