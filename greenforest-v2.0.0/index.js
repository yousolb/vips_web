import {col, storage, fires, setSRC, setHTML } from './firebase.js'
import { getStorage, ref, list, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js'
import { limit, query, orderBy, getFirestore, collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'

let qs = await getDocs(query(col, orderBy('date_added', 'desc'), limit(10)));
let docus = qs.docs;
let elt = document.querySelector(`.scroll-container`);

for(let i = 0; i < docus.length; i++) {
    let doc = docus[i];
    let product_data = doc.data();
    let reference = ref(storage, product_data.image_folder);
    let imglist = await list(reference);
    let url = await getDownloadURL(imglist.items[0]);
    let pricing = product_data.price;
    let price = `\$${Math.floor(pricing/100)}.${pricing%100}`;
    let soldOutClass = product_data.sold ? 'sold-out' : '';
    let soldOutOverlay = product_data.sold ? '<div class="out-of-stock-overlay">Out of Stock</div>' : '';
    let prod_id = doc.id;
    let link = product_data.sold 
    ? `<a style="pointer-events: none; color: gray;">${product_data.product_name}</a>` 
    : `<a href="shop_single.html?prodid=${prod_id}">${product_data.product_name}</a>`;

    console.log(prod_id)

    let collection_items = `
    <div class="product-card ${soldOutClass}">
        <img src="${url}" alt="varibolo-gloves" style="height:30vh;object-fit:cover;display:flex;justify-content:center;"/>
        <ul class="collection-icon">
            <li style="padding: 0 4em;"><a href="shop_cart.html"><i class="fa fa-cart-plus" aria-hidden="true"></i></a></li>
        </ul>
        <div class="collection-content">
            <h4>${link}</h4> <!-- Product name link with pointer-events handling -->
            <h5>${price}0</h5>
        </div>
    </div>`;

    var div = document.createElement('div');
    div.innerHTML = collection_items.trim();
    let child = div.firstChild;
    elt.appendChild(child);

}

document.getElementById('scroll-right').addEventListener('click', function() {
    const gallery = document.getElementById('scroll');
    const scrollAmount = 100; // Adjust scroll amount as needed
    gallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});