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
export let storage = getStorage(app);
export const cartItems = []

export function setHTML(selector, string) {
  let elts = document.querySelectorAll(selector);
  for (let i=0; i < elts.length; i++) {
    elts[i].innerHTML = string;
  }
}

export async function setSRC(selector, item) {
  let elts = document.querySelectorAll(selector);
  let url = await getDownloadURL(item);
  for (let i=0; i < elts.length; i++) {
    elts[i].src = url;
  }
}