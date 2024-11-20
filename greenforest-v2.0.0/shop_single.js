import { col, storage, fires, setSRC, setHTML, getProductData } from './firebase.js'
import { addToCart } from './cart_manager.js';
import { getStorage, ref, list, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js'
import { getFirestore, collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let id = urlParams.get('prodid');

let product_object = await getProductData(id);
console.log(product_object)

let largeImg = document.querySelector(`.largeImg`);
largeImg.innerHTML = '';

async function addCartSingle() {
    console.log(id);
    addToCart(id);
}

const button_div = document.getElementById("buy-button");
let form = document.createElement('form')
form.action = product_object.checkout_link
let buy_btn = document.createElement('button')
buy_btn.type = "submit"
buy_btn.className = "add-cart-btn"
buy_btn.innerText = "Buy"
form.appendChild(buy_btn)
button_div.appendChild(form)

for (let i = 0; i < product_object.product_images.length; i++) {
    let url = product_object.product_images[i]
    // let largeImg = document.querySelector(`.largeImg`)
    var li = document.createElement('li')
    var img = document.createElement('img')
    img.className = `prod-img-${i + 1}`
    img.src = url
    img.alt = 'product pic'
    img.title = 'product-pic'
    li.appendChild(img)
    largeImg.appendChild(li.cloneNode(true))
}

export const artist_id = product_object.artist_id

setHTML('.product_name', product_object.product_name);
setHTML('.product_price', product_object.product_price);
setHTML('.product_desc', product_object.product_desc);
setHTML('.artist_desc', product_object.artist_info);
setSRC('.artist_img', product_object.artist_img_url);
