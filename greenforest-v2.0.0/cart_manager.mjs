import {col, storage, fires, setSRC, setHTML, cartItems, getProductData } from './firebase.mjs'
import { getStorage, ref, list, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js'
import { getFirestore, collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'

let dropdown_cart = document.querySelector(`.cart-dropdown-menu`);

export async function addToCart(id) {
    var carts = []
    if(localStorage.getItem("carts") === null) {
        carts = []
    }
    else {
        carts = JSON.parse(localStorage.getItem("carts"));
    }
    carts.push(id);
    localStorage.setItem("carts", JSON.stringify(carts));
    dropdownCartItem(id)
}

export async function removeFromCart(id) {
    var carts = JSON.parse(localStorage.getItem("carts"))
    const index = carts.indexOf(id)
    carts.splice(index, 1)
    localStorage.setItem("carts", JSON.stringify(carts))
}

export async function populateDropdown() {
    let dropdown_cart = document.querySelector(`.cart-dropdown-menu`);
    while (dropdown_cart === null) {
        await new Promise(r => setTimeout(r, 10));
        dropdown_cart = document.querySelector(`.cart-dropdown-menu`);
    }
    dropdown_cart.innerHTML = `<div class="total-price">
    <p><span>Total Price :</span> <span class="total-pricing">$0</span> </p>
</div>
<!-- .total-prices -->
<div class="checkout-btn">
    <a href="shop_cart.html" class="btn btn-default">checkout</a>
</div>`
    let total_pricing = 0
    var carts = []
    if(localStorage.getItem("carts") === null) {
        carts = []
    }
    else {
        carts = JSON.parse(localStorage.getItem("carts"));
    }
    for(let i = 0; i < carts.length; i++) {
        let id = carts[i];
        let pricing = await dropdownCartItem(id)
        total_pricing = total_pricing + pricing
    }
    let total_price = `\$${Math.floor(total_pricing/100)}.${total_pricing%100}`;
    setHTML(".total-pricing", total_price)
}

async function dropdownCartItem(id) {
    // let docRef = doc(fires, "products", id);
    // let docu = await getDoc(docRef);
    // let product_data = docu.data();
    let dropdown_cart = document.querySelector(`.cart-dropdown-menu`);

    let prod_obj = await getProductData(id);
    let url = prod_obj.product_images[0];
    let price = prod_obj.product_price;

    let collection_items = `<div class="cart-items">
    <div class="cart-img">
        <a href="#"><img src="${url}" alt="cart-img-3" style="width:70px;height:auto;"></a>
    </div>
    <div class="cart-content">
    <h6><a href="shop_single.html?prodid=${id}">${prod_obj.product_name}</a></h6>
        <p><span>${price}</span></p>
    </div>
    <div class="clr"></div>
</div>`

    var template = document.createElement('template');
    template.innerHTML = collection_items.trim();
    dropdown_cart.append(template.content.firstChild);
    return prod_obj.price_cents;
}
