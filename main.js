let cart=JSON.parse(localStorage.getItem("cart")||"[]");
const prices={"PFP Pack":5,"Wallpaper":3,"Creator Bundle":10};

/* CART COUNT */
if(document.getElementById("count")) document.getElementById("count").innerText=cart.length;

/* ADD TO CART */
function add(item){
cart.push(item);
localStorage.setItem("cart",JSON.stringify(cart));
document.getElementById("count").innerText=cart.length;
alert(item+" added");
}

/* GO TO CHECKOUT */
function checkout(){
location.href="checkout.html";
}
