import {col, storage, fires, setSRC, setHTML } from './firebase.mjs'
import { addToCart } from './cart_manager.mjs';
import { getStorage, ref, list, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js'
import { getFirestore, collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let id = urlParams.get('prodid');
let docRef = doc(fires, "products", id);
let docu = await getDoc(docRef);
let product_data = docu.data();
let reference = ref(storage, product_data.image_folder);

async function addCartSingle() {
    console.log(id);
    addToCart(id);
}

const button = document.getElementById("add_cart_id");
button.onclick = addCartSingle

/* let imglist = await list(reference);
for(let i = 0; i < imglist.items.length; i++) {
    await setSRC(`.prod-img-${i+1}`, imglist.items[i]);
} */

let imglist = await list(reference);
for(let i = 0; i < imglist.items.length; i++) {
    let item = imglist.items[i]
    let url = await getDownloadURL(item);
    console.log(url)
    let prod_img = `
    <img class="prod-img" src="${url}" />`
    let largeImg = document.querySelector(`.largeImg`)
    let smallImg = document.querySelector(`.smallImg`)
    //var ul = document.createElement('ul');
    var li = document.createElement('li')
    li.innerHTML = prod_img.trim()
    //template.innerHTML = prod_img.trim();
    largeImg.appendChild(li);
    smallImg.appendChild(li)
    //await setSRC(`.prod-img-${i+1}`, imglist.items[i]);
}

setHTML('.product_name', product_data.product_name);
let pricing = product_data.price;
setHTML('.product_price', `\$${Math.floor(pricing/100)}.${pricing%100}`);
let desc = "";
for (let i = 0; i < product_data.description_lines.length; i++) {
  desc += "- " + product_data.description_lines[i];
  desc += "<br/>";
}
setHTML('.product_desc', desc);
let artist = await getDoc(product_data.artist);
let artist_data = artist.data();
let artist_info = `
    Artist: ${artist_data.name} <br/>
    ${artist_data.description}
`
setHTML('.artist_desc', artist_info);
let artist_img_ref = ref(storage, artist_data.image);
setSRC('.artist_img', artist_img_ref);