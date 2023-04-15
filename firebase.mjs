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
let document = qs.docs[0];
console.log(document.data());

let storage = getStorage(app);
let reference = ref(storage, document.data().image_folder);
let imglist = await list(reference);
//let urls = imglist.items.forEach(r => getDownloadURL(r))
//console.log(urls);

//import { promises as fs } from "fs";
/* 
const downloadImage = async (url, path) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(path, buffer);
} */

for(let i = 0; i < imglist.items.length; i++) {
    let url = await getDownloadURL(imglist.items[i]);
    //await downloadImage(url, `./image_${i}`);
    console.log(url);
    document.querySelector(`#nikki-${i}`).src = url;
}