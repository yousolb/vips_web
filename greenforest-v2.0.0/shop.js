import {col, storage, fires, setSRC, setHTML } from './firebase.js'
import { getStorage, ref, list, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js'
import { query, where, orderBy, getFirestore, collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'

var urlParams = new URLSearchParams(window.location.search);
var selectedItem = urlParams.get('subset');

let qs = await getDocs(query(col, orderBy('date_added', 'desc')));
let elt = document.querySelector(`.shop-items`);

if (selectedItem === 'gameday') {
    let header = document.getElementById('header-title')
    header.innerHTML = 'GAMEDAY Collection';
    header.style.color = 'white';
    qs = await getDocs(query(col, where('collection', '==', 'gameday')));
} else if (selectedItem === 'collections') {
    let header = document.getElementById('header-title')
    header.innerHTML = 'All Collections';
    qs = await getDocs(query(col, where('collection', '!=', 'none')));
} else if (selectedItem === 'fashion') {
    let header = document.getElementById('header-title')
    header.innerHTML = 'Clothing';
    qs = await getDocs(query(col, where('type', '==', 'clothing')));
} else if (selectedItem === 'accessories') {
    let header = document.getElementById('header-title')
    header.innerHTML = 'Accessories';
    qs = await getDocs(query(col, where('type', '==', 'accessory')));
} else if (selectedItem === 'plushies') {
    let header = document.getElementById('header-title')
    header.innerHTML = 'Plushies';
    qs = await getDocs(query(col, where('type', '==', 'plush')));
}
let docus = qs.docs;

for(let i = 0; i < docus.length; i++) {
    let doc = docus[i];
    let product_data = doc.data();
    let reference = ref(storage, product_data.image_folder);
    let imglist = await list(reference);
    let url = await getDownloadURL(imglist.items[0]);
    const priceInDollars = Math.floor(product_data.price / 100);
    const cents = product_data.price % 100;
    let formattedCents = cents < 10 ? `0${cents}` : `${cents}`;
    if (formattedCents.length < 2) {
        formattedCents = formattedCents.padEnd(2, '0');
    }
    const formattedPrice = `${priceInDollars}.${formattedCents}`;
    let price = `$${cents === 0 ? `${priceInDollars}.00` : formattedPrice}`;
    let prod_id = doc.id;
    let soldOutClass = product_data.sold ? 'sold-out' : '';
    let soldOutOverlay = product_data.sold ? '<div class="out-of-stock-overlay">Out of Stock</div>' : '';
    let link = product_data.sold 
    ? `<a style="pointer-events: none; color: gray;">${product_data.product_name}</a>` 
    : `<a href="shop_single.html?prodid=${prod_id}">${product_data.product_name}</a>`;
    console.log(product_data.product_name)

    let collection_items = `
    <div class="col-lg-4 col-sm-6 col-12" style="flex: 1 0 22%; min-width:200px">
    <div class="collection-items ${soldOutClass}">
    <div class="collection-img">
        <div class="collection-overlay"></div>
        <img src="${url}" alt="collection-img-1" style="height:40vh;object-fit: cover;"/>
        ${soldOutOverlay}
        <ul class="collection-icon">
        </ul>
    </div>
    <!-- .collection-img -->
    <div class="collection-content">
        <h4>${link}</h4>
        <h5>${price}</h5>
    </div>
    <!-- .collection-content -->
    </div>
    <!-- .collection-items -->
    </div>`;

    var div = document.createElement('div');
    div.innerHTML = collection_items.trim();
    let child = div.firstChild;
    elt.appendChild(child);

}