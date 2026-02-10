// CART LOGIC
let cart = JSON.parse(localStorage.klyro || "[]");

function addToCart(){
    let sizeSelect = event.target.parentElement.querySelector("select");
    let size = sizeSelect ? sizeSelect.value : "M";

    let productName = event.target.parentElement.querySelector("h2").innerText;

    cart.push({
        name: productName,
        size:size,
        price:9
    });

    localStorage.klyro = JSON.stringify(cart);
    renderCart();
    alert("Added to cart!");
}

// DISPLAY CART
function renderCart(){
    let div = document.getElementById("cart");
    if(!div) return;

    div.innerHTML = "";
    let total = 0;

    cart.forEach((item,index)=>{
        total += item.price;
        div.innerHTML += `<div>${item.name} | Size ${item.size} — $${item.price}</div>`;
    });

    div.innerHTML += `<strong>Total: $${total}</strong>`;
}

// INITIAL RENDER
renderCart();

// ======= 3D VIEW TOGGLE =======
function toggle3D(card){
    let iframe = card.querySelector("iframe");
    if(!iframe) return;

    if(iframe.style.display === "none"){
        iframe.style.display = "block";
        card.querySelector("button:last-of-type").innerText = "Hide 3D";
    } else {
        iframe.style.display = "none";
        card.querySelector("button:last-of-type").innerText = "View 3D";
    }
}
