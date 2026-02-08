// =====================
// FAST LOADER
// =====================
window.addEventListener("load", () => {
  const loader = document.getElementById("loading");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 200);
  }
});

// Page switch loader
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    if (link.target !== "_blank") {
      e.preventDefault();
      const loader = document.getElementById("loading");
      if (loader) {
        loader.style.display = "flex";
        loader.style.opacity = "1";
      }
      setTimeout(() => window.location = link.href, 80);
    }
  });
});

// =====================
// CART
// =====================
let cart = JSON.parse(localStorage.getItem("klyroCart") || "[]");

function addToCart(name, price) {
  const found = cart.find(i => i.name === name);
  if (found) found.quantity++;
  else cart.push({ name, price, quantity: 1 });

  localStorage.setItem("klyroCart", JSON.stringify(cart));
  alert("Added to cart!");
}

function displayCart() {
  const div = document.getElementById("cart-items");
  if (!div) return;

  cart = JSON.parse(localStorage.getItem("klyroCart") || "[]");
  div.innerHTML = "";

  let total = 0;
  let receipt = "";

  cart.forEach(item => {
    total += item.price * item.quantity;
    receipt += `${item.name} x${item.quantity} — $${item.price * item.quantity}\n`;

    div.innerHTML += `<p>${item.name} x${item.quantity} — $${item.price * item.quantity}</p>`;
  });

  document.getElementById("total-price").innerText = total;
  return receipt;
}

// =====================
// THEME (BLACK DEFAULT)
// =====================
document.body.classList.remove("light");

document.getElementById("theme-switch")?.addEventListener("click", e => {
  e.preventDefault();
  document.body.classList.toggle("light");
});

// =====================
// CHECKOUT EMAIL
// =====================
document.getElementById("checkout-form")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const receipt = displayCart();
  const total = document.getElementById("total-price").innerText;

  if (!receipt) {
    alert("Cart empty");
    return;
  }

  emailjs.send("service_vyelgrs", "template_aummpt5", {
    customer_name: this.customer_name.value,
    customer_email: this.customer_email.value,
    order_details: receipt,
    total: total
  }).then(() => {
    alert("Order sent! Receipt emailed.");
    localStorage.removeItem("klyroCart");
    location.reload();
  });
});
