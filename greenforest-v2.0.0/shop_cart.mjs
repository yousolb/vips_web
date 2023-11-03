import {col, storage, fires, setSRC, setHTML, cartItems } from './firebase.mjs'
import { getStorage, ref, list, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js'
import { getFirestore, collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'

console.log(document)
let elt = document.querySelector(`.cart-dropdown-menu`);
let total_pricing = 0

export async function addToCart(id) {
    var words = JSON.parse(sessionStorage.getItem("carts"));
    words.push(id);
    sessionStorage.setItem("carts", JSON.stringify(words));
    cartOneItem(id)
}

async function loadCart() {
    var carts = JSON.parse(sessionStorage.getItem("carts"));
    for(let i = 0; i < carts.length; i++) {
        let id = carts[i];
        console.log(id);
        cartOneItem(id)
    }
}

async function cartOneItem(id) {
    let docRef = doc(fires, "products", id);
    let docu = await getDoc(docRef);
    let product_data = docu.data();
    let reference = ref(storage, product_data.image_folder);
    let imglist = await list(reference);
    let url = await getDownloadURL(imglist.items[0]);
    let pricing = product_data.price;
    let price = `\$${Math.floor(pricing/100)}.${pricing%100}`;
    total_pricing = total_pricing + +pricing

    let collection_items = `<div class="cart-items">
    <div class="cart-img">
        <a href="#"><img src="${url}" alt="cart-img-3" style="width:70px;height:auto;"></a>
    </div>
    <div class="cart-content">
    <h6><a href="shop_single.html?prodid=${id}">${product_data.product_name}</a></h6>
        <p>1*<span>${price}</span></p>
    </div>
    <div class="cart-btn">
        <a href="#"><i class="fa fa-times" aria-hidden="true"></i></a>
    </div>
    <div class="clr"></div>
</div>`

    var template = document.createElement('template');
    template.innerHTML = collection_items.trim();
    elt.append(template.content.firstChild);
}

await loadCart();
let total_price = `\$${Math.floor(total_pricing/100)}.${total_pricing%100}`;
setHTML(".total-pricing", total_price)