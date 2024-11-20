// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js'
import { getFirestore, collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'
import { getStorage, ref, list, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoIm35xD9Ad1Y5Oa722YYLtbf2zDB3JpM",
  authDomain: "vips-web-5807a.firebaseapp.com",
  projectId: "vips-web-5807a",
  storageBucket: "vips-web-5807a.appspot.com",
  messagingSenderId: "754667322013",
  appId: "1:754667322013:web:9e8aa13cdb809647d7b274",
  measurementId: "G-Z0K73YT1E3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export let fires = getFirestore(app);
export let col = collection(fires, 'products');
export let artist_col = collection(fires, 'artists');
export let materials_and_sourcing_col = collection(fires, 'materials-and-sourcing')
export let storage = getStorage(app);
export const cartItems = []

export function setHTML(selector, string) {
  let elts = document.querySelectorAll(selector);
  for (let i = 0; i < elts.length; i++) {
    elts[i].innerHTML = string;
  }
}

export async function setSRC(selector, url) {
  let elts = document.querySelectorAll(selector);
  for (let i = 0; i < elts.length; i++) {
    elts[i].src = url;
  }
}

export async function getFromDatabase(id) {
  let database_product = {}
  let docRef = doc(fires, "products", id);
  let docu = await getDoc(docRef);
  let product_data = docu.data();
  database_product.product_name = product_data.product_name;

  const priceInDollars = Math.floor(product_data.price / 100);
  const cents = product_data.price % 100;
  let formattedCents = cents < 10 ? `0${cents}` : `${cents}`;
  if (formattedCents.length < 2) {
    formattedCents = formattedCents.padEnd(2, '0');
  }
  database_product.product_price = `$${cents === 0 ? `${priceInDollars}.00` : `${priceInDollars}.${formattedCents}`}`;
  database_product.checkout_link = product_data.checkout_link

  database_product.product_images = []
  let reference = ref(storage, product_data.image_folder);
  let imglist = await list(reference);
  for (let j = 0; j < imglist.items.length; j++) {
    let url = await getDownloadURL(imglist.items[j]);
    database_product.product_images.push(url)
  }
  let desc = "";
  for (let i = product_data.description_lines.length - 1; i >= 0; i--) {
    desc += "- " + product_data.description_lines[i];
    desc += "<br/>";
  }
  database_product.product_desc = desc;
  let artist = await getDoc(product_data.artist);
  let artist_data = artist.data();
  let artist_info = `
      Created By: <strong>${artist_data.name}</strong></br>
      ${artist_data.label}
  `
  database_product.artist = artist
  database_product.artist_id = product_data.artist.id
  database_product.artist_info = artist_info
  let artist_img_ref = ref(storage, artist_data.image);
  database_product.artist_img_url = await getDownloadURL(artist_img_ref)

  return database_product
}

export async function artistDatabase(id) {
  let database_artist = {}
  let docRef = doc(fires, "artists", id);
  let docu = await getDoc(docRef);
  let artist_data = docu.data();
  database_artist.name = artist_data.name;

  database_artist.label = artist_data.label;
  database_artist.description = artist_data.description;

  let fav_animal = `
      Favorite animal: ${artist_data.fav_animal} <br/>
  `
  database_artist.fav_animal = fav_animal

  let artist_img_ref = ref(storage, artist_data.image);
  database_artist.img_url = await getDownloadURL(artist_img_ref)

  return database_artist
}

export async function getProductData(id) {
  if (sessionStorage.getItem(id) === null) { //if not in session storage
    let product_object = await getFromDatabase(id); //wait until got from database to continue
    sessionStorage.setItem(id, JSON.stringify(product_object)); //put object into session storage
    return product_object; //return object
  }
  else {
    return JSON.parse(sessionStorage.getItem(id))
  }
}

export async function getArtistData(id) {
  if (sessionStorage.getItem(id) === null) {
    let artist_object = await artistDatabase(id);
    sessionStorage.setItem(id, JSON.stringify(artist_object));
    return artist_object;
  }
  else {
    return JSON.parse(sessionStorage.getItem(id))
  }
}
