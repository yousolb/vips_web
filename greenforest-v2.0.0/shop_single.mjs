import {col, storage, fires, setSRC, setHTML, getProductData } from './firebase.mjs'
import { addToCart } from './cart_manager.mjs';
import { getStorage, ref, list, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js'
import { getFirestore, collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let id = urlParams.get('prodid');

let product_object = await getProductData(id);

async function addCartSingle() {
    console.log(id);
    addToCart(id);
}

const button = document.getElementById("add_cart_id");
button.onclick = addCartSingle

for(let i = 0; i < product_object.product_images.length; i++) {
    let url = product_object.product_images[i]
    let largeImg = document.querySelector(`.largeImg`)
    var li = document.createElement('li')
    var img = document.createElement('img')
    img.class = `prod-img-${i+1}`
    img.src = url
    li.appendChild(img)
    largeImg.appendChild(li.cloneNode(true))
}

setHTML('.product_name', product_object.product_name);
setHTML('.product_price', product_object.product_price);
setHTML('.product_desc', product_object.product_desc);
setHTML('.artist_desc', product_object.artist_info);
setSRC('.artist_img', product_object.artist_img_url);