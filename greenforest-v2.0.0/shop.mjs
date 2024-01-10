import {col, storage, fires, setSRC, setHTML } from './firebase.mjs'
import { getStorage, ref, list, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js'
import { query, orderBy, getFirestore, collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'

let qs = await getDocs(query(col, orderBy('date_added', 'desc')));
let docus = qs.docs;
let elt = document.querySelector(`.shop-items`);

for(let i = 0; i < docus.length; i++) {
    let doc = docus[i];
    let product_data = doc.data();
    let reference = ref(storage, product_data.image_folder);
    let imglist = await list(reference);
    let url = await getDownloadURL(imglist.items[0]);
    let pricing = product_data.price;
    let price = `\$${Math.floor(pricing/100)}.${pricing%100}`;
    let prod_id = doc.id;

    let collection_items = `
    <div class="col-lg-4 col-sm-6 col-12" style="display:flex;">
    <div class="collection-items">
    <div class="collection-img">
        <div class="collection-overlay"></div>
        <img src="${url}" alt="collection-img-1" style="width:25vw;height:50vh;object-fit: cover;"/>
        <ul class="collection-icon">
        </ul>
    </div>
    <!-- .collection-img -->
    <div class="collection-content">
        <h4><a href="shop_single.html?prodid=${prod_id}">${product_data.product_name}</a></h4>
        <h5>${price}</h5>
    </div>
    <!-- .collection-content -->
    </div>
    <!-- .collection-items -->
    </div>`

    var div = document.createElement('div');
    div.innerHTML = collection_items.trim();
    let child = div.firstChild;
    elt.appendChild(child);

}