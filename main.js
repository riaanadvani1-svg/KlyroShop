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

// Populate checkout page if on checkout
window.addEventListener("load", () => {
  updateCount();
  if(document.getElementById("items")){
    let total = 0;

    // Count quantities
    const counts = {};
    cart.forEach(i => counts[i] = (counts[i] || 0) + 1);

    const itemsHTML = Object.keys(counts).map(i => {
      const subtotal = prices[i] * counts[i];
      total += subtotal;
      return `<tr><td>${i} x ${counts[i]}</td><td>$${subtotal}</td></tr>`;
    }).join("");

    document.getElementById("items").innerHTML = itemsHTML;
    document.getElementById("total").innerText = total;

    // Prepare form hidden inputs for Formspree
    const form = document.getElementById("checkoutForm");
    const formItems = document.getElementById("formItems");
    const formTotal = document.getElementById("formTotal");

    form.addEventListener("submit", function(e){
      let itemsText = Object.keys(counts).map(i => `${i} x ${counts[i]} = $${counts[i]*prices[i]}`).join("\n");
      formItems.value = itemsText;
      formTotal.value = total;

      // Clear cart
      localStorage.removeItem("cart");
    });
  }
});
