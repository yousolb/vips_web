import {col, storage, fires, setSRC, setHTML } from './firebase.mjs'
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
    let prod_id = doc.id;

    console.log(prod_id)

    let collection_items = `<div class="product-card">
    <img src="${url}" alt="varibolo-gloves" style="height:30vh;object-fit:cover;display:flex;justify-content:center;"/>
    <ul class="collection-icon">
        <li><a href="#"><i class="fa fa-heart-o" aria-hidden="true"></i></a></li>
        <li><a href="shop_cart.html"><i class="fa fa-cart-plus" aria-hidden="true"></i></a></li>
    </ul>
    <div class="collection-content">
        <h4><a href="shop_single.html?prodid=${prod_id}">${product_data.product_name}</a></h4>
        <h5>${price}</h5>
    </div>
</div>  `

    var div = document.createElement('div');
    div.innerHTML = collection_items.trim();
    let child = div.firstChild;
    elt.appendChild(child);

}