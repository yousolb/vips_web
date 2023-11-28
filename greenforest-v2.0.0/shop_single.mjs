import {col, storage, fires, setSRC, setHTML, getProductData } from './firebase.mjs'
import { addToCart } from './cart_manager.mjs';
import { getStorage, ref, list, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js'
import { getFirestore, collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let id = urlParams.get('prodid');

let product_object = await getProductData(id);

for(let i = 0; i < product_object.product_images.length; i++) {
    await setSRC(`.prod-img-${i+1}`, product_object.product_images[i]);
}

async function addCartSingle() {
    console.log(id);
    addToCart(id);
}

const button = document.getElementById("add_cart_id");
button.onclick = addCartSingle

/* let imglist = await list(reference);
for(let i = 0; i < imglist.items.length; i++) {
    let item = imglist.items[i]
    let url = await getDownloadURL(item);
    //console.log(url)
    let prod_img = `
    <li> <img class="prod-img-${i+1}" src="${url}" /> </li>`
    //console.log(prod_img)
    //let largeImg = document.querySelector(`.largeImg`)
    //let smallImg = document.querySelector(`.smallImg`)
    let slides = document.querySelectorAll(`.slides`)
    //var ul = document.createElement('ul');
    //var li = document.createElement('li')
    //li.innerHTML = prod_img
    //console.log(li)
    let template = document.createElement('template')
    template.innerHTML = prod_img
    //console.log(template.content.firstChild)
    //largeImg.appendChild(template.content.firstChild)
    //smallImg.appendChild(template.content.firstChild)
    for(let j = 0; j < slides.length; j++) {
        console.log(template.content.firstChild)
        slides[j].appendChild(template.content.firstChild);
        //console.log(li)
    }
    
    //smallImg.appendChild(li)
    //await setSRC(`.prod-img-${i+1}`, imglist.items[i]);
} */

setHTML('.product_name', product_object.product_name);
setHTML('.product_price', product_object.product_price);
setHTML('.product_desc', product_object.product_desc);
setHTML('.artist_desc', product_object.artist_info);
setSRC('.artist_img', product_object.artist_img_url);