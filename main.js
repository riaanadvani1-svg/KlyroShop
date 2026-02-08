let prices={
"PFP Pack":5,
"Wallpaper":3,
"Creator Bundle":10
};

let cart=JSON.parse(localStorage.getItem("cart"))||[];

function save(){
localStorage.setItem("cart",JSON.stringify(cart));
document.getElementById("count")&&(document.getElementById("count").innerText=cart.length);
}

save();

function add(item){
cart.push(item);
save();
alert(item+" added!");
}

function checkout(){
window.location="checkout.html";
}

// checkout page
if(document.getElementById("items")){
let total=0;
document.getElementById("items").innerHTML=cart.map(i=>{
total+=prices[i];
return `<tr><td>${i}</td><td>$${prices[i]}</td></tr>`;
}).join("");

document.getElementById("total").innerText=total;

document.getElementById("form").onsubmit=e=>{
e.preventDefault();

fetch("https://formspree.io/f/mreagrvg",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
email:document.getElementById("email").value,
items:cart.join(", "),
total:total
})
});

alert("Receipt sent!");
localStorage.removeItem("cart");
};
}
