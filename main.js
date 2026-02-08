// main.js
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const prices = {
  "PFP Pack": 5,
  "Wallpaper": 3,
  "Creator Bundle": 10
};

// Add item to cart
function add(item) {
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCount();
  alert(item + " added to cart!");
}

// Update cart count in nav
function updateCount() {
  if(document.getElementById("count")){
    document.getElementById("count").innerText = cart.length;
  }
}

// Go to checkout page
function checkout() {
  window.location.href = "checkout.html";
}

// Populate checkout page
window.addEventListener("load", () => {
  updateCount();
  if(document.getElementById("items")){
    let total = 0;
    const itemsHTML = cart.map(i => {
      total += prices[i];
      return `<tr><td>${i}</td><td>$${prices[i]}</td></tr>`;
    }).join("");
    document.getElementById("items").innerHTML = itemsHTML;
    document.getElementById("total").innerText = total;
  }
});
