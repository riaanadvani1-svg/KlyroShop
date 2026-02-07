emailjs.init("V8qNrtKuz9ZRrq6Nrvvo1");

const SERVICE="service_4os0tg5";
const TEMPLATE="template_7hoecnn";

const prices={
"PFP Pack":5,
"Wallpaper":3,
"Creator Bundle":10
};

let cart=JSON.parse(localStorage.getItem("cart")||"[]");

/* COUNT */
if(document.getElementById("count")){
document.getElementById("count").innerText=cart.length;
}

/* ADD */
function add(item){
cart.push(item);
localStorage.setItem("cart",JSON.stringify(cart));
document.getElementById("count").innerText=cart.length;
alert(item+" added");
}

/* CHECKOUT */
function checkout(){
location.href="checkout.html";
}

/* LOAD CHECKOUT */
let total=0;

if(document.getElementById("items")){
document.getElementById("items").innerHTML=cart.map(i=>{
total+=prices[i];
return `<tr><td>${i}</td><td>$${prices[i]}</td></tr>`;
}).join("");

document.getElementById("total").innerText=total;
}

/* BUY */
function buy(){

let email=document.getElementById("email").value;

if(!email)return alert("Enter email");

emailjs.send(SERVICE,TEMPLATE,{
to_email:email,
items:cart.join(", "),
total:total
}).then(()=>{

alert("Receipt sent!");
localStorage.removeItem("cart");
location.href="index.html";

}).catch(e=>{
alert("Email error");
console.log(e);
});

}
