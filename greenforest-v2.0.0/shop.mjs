import {col, storage, fires, setSRC, setHTML } from './firebase.mjs'
import { getStorage, ref, list, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js'
import { getFirestore, collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'

let qs = await getDocs(col);
let docus = qs.docs;
let product_data = docus.data();
let reference = ref(storage, product_data.image_folder);