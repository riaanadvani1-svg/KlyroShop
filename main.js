let cart = JSON.parse(localStorage.klyro || "[]");

function add(id){

let item;

if(id===1){
item={
name:"Black Flame Hoodie",
price:9,
size:size1.value,
color:color1.value
};
}

if(id===2){
item={
name:"I Love Pizza Hoodie",
price:9,
size:size2.value,
color:color2.value
};
}

cart.push(item);
localStorage.klyro=JSON.stringify(cart);

alert("Added to cart");
}

// checkout
if(document.getElementById("cart")){
let total=0;
cart.forEach(x=>{
total+=x.price;
cart.innerHTML+=`
<div style="padding:12px;border-bottom:1px solid #333">
${x.name} – ${x.size} – ${x.color} — $${x.price}
</div>`;
});
total.innerText=total;
}

function pay(){
location.href="https://buy.stripe.com/test_00wdR972M3gt4NF2vQ5Vu00";
}
