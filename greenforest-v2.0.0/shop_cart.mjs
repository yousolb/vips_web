import {col, storage, fires, setSRC, setHTML, getProductData } from './firebase.mjs'
import { getStorage, ref, list, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js'
import { getFirestore, collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'
import { removeFromCart } from './cart_manager.mjs';

let elt = document.querySelector(`.cart-products`);
let total_pricing = 0

export async function populateCart() {
    var carts = []
    if(localStorage.getItem("carts") === null) {
        carts = []
    }
    else {
        carts = JSON.parse(localStorage.getItem("carts"));
    }
    console.log(carts)
    for(let i = 0; i < carts.length; i++) {
        let id = carts[i];
        let prod_obj = await getProductData(id);
        let url = prod_obj.product_images[0];
        let pricing = prod_obj.price_cents;
        let price = prod_obj.product_price;
        total_pricing = total_pricing + +pricing

        let collection_items = `<tr>
        <td class="cart-product">
            <div class="product-cart-img">
                <a href="#"><img src="${url}" alt="product-cart-img-1" style="width:200px;height:auto;" /></a>
            </div>
            <!-- .product-cart-img -->
            <div class="product-cart-title">
            <h4><a href="shop_single.html?prodid=${id}">${prod_obj.product_name}</a></h4>
            </div>
            <!-- .product-cart-title -->
        </td>
        <td class="cart-price">${price}</td>
        <td class="cart-edit">
            <button href="#" id="remove_cart_id_${i}"><i class="fa fa-times"></i></button>
        </td>
        </tr>`

        var template = document.createElement('template');
        template.innerHTML = collection_items.trim();
        elt.appendChild(template.content.firstChild);

        async function removeShopCart() {
            removeFromCart(id)
            elt.innerHTML = ``
            populateCart()
        }

        const button = document.getElementById(`remove_cart_id_${i}`);
        button.onclick = removeShopCart
    }
}

await populateCart()

let total_price = `\$${Math.floor(total_pricing/100)}.${total_pricing%100}`;
setHTML(".cart-subtotal", total_price)
setHTML(".order-total", total_price)