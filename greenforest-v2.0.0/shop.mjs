import {col, storage, fires, setSRC, setHTML } from './firebase.mjs'
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
    let header_desc = document.getElementById('header-desc')
    header_desc.innerHTML = 'VIP\'s Fund originated at the University of Michigan, so we are beyond excited to announce the first collection of the 2023 academic year paying homage to the Maize and Blue!';
    header_desc.style.color = '#2268B8';
    qs = await getDocs(query(col, where('collection', '==', 'gameday')));
} else if (selectedItem === 'varibolo') {
    let header = document.getElementById('header-title')
    header.innerHTML = 'VARIBOLO Collection';
    let header_desc = document.getElementById('header-desc')
    header_desc.innerHTML = '"Varibolo" is the local Malagasy word for the bamboo lemur, a species that lives in Ranomafana National Park, Madagascar. VIP\'s is working to protect wildlife in this region in collaboration with Varibolo Resto and its owner, Patrick Randriamamonjy.';
    header_desc.style.color = '#784040'
    qs = await getDocs(query(col, where('collection', '==', 'varibolo')));
} else if (selectedItem === 'affection') {
    qs = await getDocs(query(col, where('collection', '==', 'affection')));
} else if (selectedItem === 'gaia') {
    let header = document.getElementById('header-title')
    header.innerHTML = 'GAIA Collection';
    let header_desc = document.getElementById('header-desc')
    header_desc.innerHTML = 'We bring you the GAIA collection on Earth Day 2023 to honor the ecological essence of VIP\'s. Named after the greek goddess of the earth, Gaia theory encourages us to look at the earth as one giant living, breathing organism that in turn gives us life. Please rejoice in the abundance of nature with us as you shop this collection!';
    header_desc.style.color = 'green'
    qs = await getDocs(query(col, where('collection', '==', 'gaia')));
}
let docus = qs.docs;

for(let i = 0; i < docus.length; i++) {
    let doc = docus[i];
    let product_data = doc.data();
    let reference = ref(storage, product_data.image_folder);
    let imglist = await list(reference);
    let url = await getDownloadURL(imglist.items[0]);
    let pricing = product_data.price;
    let price = `\$${Math.floor(pricing/100)}.${pricing%100}`;
    let prod_id = doc.id;
    console.log(product_data.product_name)

    let collection_items = `
    <div class="col-lg-4 col-sm-6 col-12" style="flex: 1 0 25%">
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