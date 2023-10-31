import {col, storage, fires, setSRC, setHTML } from './firebase.mjs'
import { getStorage, ref, list, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js'
import { getFirestore, collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'

let elt = document.querySelector(`.cart-products`);
let total_pricing = 0

export async function addToCart(id) {
    let docRef = doc(fires, "products", id);
    let docu = await getDoc(docRef);
    let product_data = docu.data();
    let reference = ref(storage, product_data.image_folder);
    let imglist = await list(reference);
    let url = await getDownloadURL(imglist.items[0]);
    let pricing = product_data.price;
    let price = `\$${Math.floor(pricing/100)}.${pricing%100}`;
    let prod_id = doc.id;
    total_pricing = total_pricing + +pricing

    let collection_items = `<tr>
    <td class="cart-product">
        <div class="product-cart-img">
            <a href="#"><img src="${url}" alt="product-cart-img-1" style="width:200px;height:auto;" /></a>
        </div>
        <!-- .product-cart-img -->
        <div class="product-cart-title">
        <h4><a href="shop_single.html?prodid=${prod_id}">${product_data.product_name}</a></h4>
        </div>
        <!-- .product-cart-title -->
    </td>
    <td class="cart-price">${price}</td>
    <td class="cart-edit">
        <a href="#"><i class="fa fa-times"></i></a>
    </td>
    </tr>`
    console.log(product_data.product_name)
    console.log(price)

    var template = document.createElement('template');
    template.innerHTML = collection_items.trim();
    elt.appendChild(template.content.firstChild);
}

let total_price = `\$${Math.floor(total_pricing/100)}.${total_pricing%100}`;
setHTML(".cart-subtotal", total_price)
setHTML(".order-total", total_price)