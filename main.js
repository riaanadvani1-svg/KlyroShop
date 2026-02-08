// Loader
window.addEventListener('load', ()=>{
    setTimeout(()=>document.getElementById('loading')?.classList.add('hidden'), 500);
});

// Cart
let cart = JSON.parse(localStorage.getItem('klyroCart')||"[]");

function addToCart(name, price){
    const existing = cart.find(i=>i.name===name);
    if(existing){ existing.quantity +=1; }
    else { cart.push({name, price, quantity:1}); }
    localStorage.setItem('klyroCart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

function displayCart(){
    const cartItemsDiv = document.getElementById('cart-items');
    if(!cartItemsDiv) return;
    cartItemsDiv.innerHTML='';
    let total=0;
    cart.forEach(i=>{
        total += i.price*i.quantity;
        const p = document.createElement('p');
        p.textContent=`${i.name} x ${i.quantity} = $${i.price*i.quantity}`;
        cartItemsDiv.appendChild(p);
    });
    document.getElementById('total-price')?.textContent=total;
}

// Page transitions loader
document.querySelectorAll('a').forEach(link=>{
    link.addEventListener('click', e=>{
        if(link.target!=='_blank'){
            e.preventDefault();
            document.getElementById('loading')?.classList.remove('hidden');
            setTimeout(()=>window.location=link.href, 500);
        }
    });
});

// Theme switch
const themeSwitch = document.getElementById('theme-switch');
themeSwitch?.addEventListener('click', e=>{
    e.preventDefault();
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light')?'light':'dark');
});

// Load saved theme
if(localStorage.getItem('theme')==='light'){
    document.body.classList.add('light');
}
