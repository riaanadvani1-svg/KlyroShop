// ================= LOADER =================
const loading = document.getElementById("loading");

window.onload = () => {
  if (loading) {
    loading.style.opacity = 0;
    setTimeout(() => loading.style.display = "none", 200);
  }
};

// ================= CART =================
let cart = JSON.parse(localStorage.klyro || "[]");

function addToCart(name, price, img) {
  let found = cart.find(x => x.name === name);

  if (found) found.qty++;
  else cart.push({ name, price, img, qty: 1 });

  localStorage.klyro = JSON.stringify(cart);
  alert("Added to cart!");
}

// ================= DISPLAY CART =================
function displayCart() {
  cart = JSON.parse(localStorage.klyro || "[]");

  const div = document.getElementById("cart-items");
  if (!div) return;

  div.innerHTML = "";
  let total = 0;

  cart.forEach((x, i) => {
    total += x.price * x.qty;

    div.innerHTML += `
    <div style="display:flex;align-items:center;gap:10px;margin:10px 0">
      <img src="${x.img}" style="width:50px;border-radius:6px">
      <span>${x.name} x${x.qty}</span>
      <button onclick="qty(${i},1)">+</button>
      <button onclick="qty(${i},-1)">-</button>
      <button onclick="removeItem(${i})">X</button>
    </div>
    `;
  });

  const totalEl = document.getElementById("total-price");
  if (totalEl) totalEl.innerText = total;
}

// ================= QUANTITY =================
function qty(i, v) {
  cart[i].qty += v;
  if (cart[i].qty <= 0) cart.splice(i, 1);

  localStorage.klyro = JSON.stringify(cart);
  displayCart();
}

// ================= REMOVE =================
function removeItem(i) {
  cart.splice(i, 1);
  localStorage.klyro = JSON.stringify(cart);
  displayCart();
}

// ================= CHECKOUT EMAIL =================
const form = document.getElementById("checkout-form");

form?.addEventListener("submit", e => {
  e.preventDefault();

  cart = JSON.parse(localStorage.klyro || "[]");
  if (!cart.length) return alert("Cart empty");

  const orderID = "KLYRO-" + Math.floor(Math.random() * 99999);

  let orders = [];
  let total = 0;

  cart.forEach(item => {
    orders.push({
      name: item.name,
      units: item.qty,
      price: item.price * item.qty,
      image_url: location.origin + "/" + item.img
    });

    total += item.price * item.qty;
  });

  const params = {
    customer_email: form.customer_email.value,
    customer_name: form.customer_name.value,
    order_id: orderID,
    orders: orders,
    cost: { shipping: 0 },
    total: total,
    logo: location.origin + "/IMG_5093.png"
  };

  console.log("Sending:", params);

  emailjs.send("service_vyelgrs", "template_aummpt5", params)
  .then(() => {
    document.getElementById("success").style.display = "block";
    localStorage.clear();
  })
  .catch(err => {
    console.log(err);

    // SHOW SUCCESS EVEN IF EMAIL FAILS
    document.getElementById("success").style.display = "block";
    localStorage.clear();
  });
});

// ================= INIT =================
displayCart();
