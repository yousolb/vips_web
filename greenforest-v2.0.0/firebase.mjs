// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js'
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'
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

let fires = getFirestore(app);
let col = collection(fires, 'products');
let qs = await getDocs(col);
let doc = qs.docs[0];
console.log(doc.data());

let storage = getStorage(app);
let reference = ref(storage, doc.data().image_folder);
let imglist = await list(reference);

for(let i = 0; i < imglist.items.length; i++) {
    let url = await getDownloadURL(imglist.items[i]);
    console.log(url);
    let elts = document.querySelectorAll(`.prod-img-${i+1}`);
    for (let j=0; j < elts.length; j++) {
        elts[j].src = url;
    }
}

let elts = document.querySelectorAll('.product_name');
for (let j = 0; j < elts.length; j++) {
  elts[j].innerHTML = doc.data().product_name
}

let price_elts = document.querySelectorAll('.product_price');
for (let j = 0; j < price_elts.length; j++) {
  let pricing = doc.data().price
  price_elts[j].innerHTML = `\$${Math.floor(pricing/100)}.${pricing%100}`
}

let desc_elts = document.querySelectorAll('.product_desc');
let desc = "";
for (let i = 0; i < doc.data().description_lines.length; i++) {
  desc += "- " + doc.data().description_lines[i];
  desc += "<br/>";
}
for (let j = 0; j < desc_elts.length; j++) {
  desc_elts[j].innerHTML = desc;
}