// LOADER
window.onload=()=>{
loading.style.opacity=0;
setTimeout(()=>loading.style.display="none",200);
};

document.querySelectorAll("a").forEach(a=>{
a.onclick=e=>{
e.preventDefault();
loading.style.display="flex";
setTimeout(()=>location=a.href,80);
};
});

// CART
let cart=JSON.parse(localStorage.klyro||"[]");

function addToCart(n,p,i){
let f=cart.find(x=>x.name==n);
if(f)f.qty++;
else cart.push({name:n,price:p,img:i,qty:1});
localStorage.klyro=JSON.stringify(cart);
alert("Added to cart!");
}

// SHOW CART
function displayCart(){
cart=JSON.parse(localStorage.klyro||"[]");
let d=document.getElementById("cart-items");
if(!d)return;
d.innerHTML="";
let total=0;

cart.forEach((x,i)=>{
total+=x.price*x.qty;

d.innerHTML+=`
<div class="row">
<img src="${x.img}">
${x.name} x${x.qty}
<button onclick="qty(${i},1)">+</button>
<button onclick="qty(${i},-1)">-</button>
<button onclick="removeItem(${i})">X</button>
</div>`;
});

total-price.innerText=total;
}

// QUANTITY
function qty(i,v){
cart[i].qty+=v;
if(cart[i].qty<=0)cart.splice(i,1);
localStorage.klyro=JSON.stringify(cart);
displayCart();
}

// REMOVE
function removeItem(i){
cart.splice(i,1);
localStorage.klyro=JSON.stringify(cart);
displayCart();
}

// THEME
theme-switch?.onclick=e=>{
e.preventDefault();
document.body.classList.toggle("light");
};

// CHECKOUT
checkout-form?.addEventListener("submit",e=>{
e.preventDefault();

let order="";
let total=0;

cart.forEach(i=>{
order+=`${i.name} x${i.qty} = $${i.price*i.qty}\n`;
total+=i.price*i.qty;
});

let id="KLYRO-"+Math.floor(Math.random()*99999);

emailjs.send("service_vyelgrs","template_aummpt5",{
customer_name:e.target.customer_name.value,
customer_email:e.target.customer_email.value,
order_details:order,
total:total,
order_id:id
});

success.style.display="block";
localStorage.clear();
});
