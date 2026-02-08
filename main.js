// Show loading on page load and hide after 1s
window.addEventListener('load', () => {
    setTimeout(()=>document.getElementById('loading').classList.add('hidden'), 500);
});

// Cart Logic
let cart = JSON.parse(localStorage.getItem('klyroCart') || "[]");

function addToCart(name, price){
  const existing = cart.find(i=>i.name===name);
  if(existing){ existing.quantity += 1; } 
  else { cart.push({name, price, quantity:1}); }
  localStorage.setItem('klyroCart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

function displayCart(){
  const cartItemsDiv = document.getElementById('cart-items');
  if(!cartItemsDiv) return;
  cartItemsDiv.innerHTML = '';
  let total = 0;
  cart.forEach(item=>{
    total += item.price*item.quantity;
    const p = document.createElement('p');
    p.textContent = `${item.name} x ${item.quantity} = $${item.price*item.quantity}`;
    cartItemsDiv.appendChild(p);
  });
  document.getElementById('total-price').textContent = total;
}

// Page transition loader
document.querySelectorAll('a').forEach(link=>{
  link.addEventListener('click', e=>{
    if(link.getAttribute('target')!=='_blank'){
      e.preventDefault();
      document.getElementById('loading').classList.remove('hidden');
      setTimeout(()=>{ window.location = link.href; }, 500);
    }
  });
});

