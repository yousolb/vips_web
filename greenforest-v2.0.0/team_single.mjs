import {col, storage, fires, setSRC, setHTML, getProductData, getArtistData } from './firebase.mjs'
import { getStorage, ref, list, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js'
import { query, where, getFirestore, collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let id = urlParams.get('prodid');

console.log(id)

let artist_object = await getArtistData(id);

setHTML('.artist_name', artist_object.name);
setHTML('.label', artist_object.label);
setHTML('.fav_animal', artist_object.fav_animal);
setHTML('.description', artist_object.description);
setSRC('.artist_img', artist_object.img_url);

const artist_id_p = doc(fires, "artists", id);
let qs = await getDocs(query(col, where('artist', '==', artist_id_p)));
let docus = qs.docs;
let elt = document.querySelector(`.more_from_artist`);

for(let i = 0; i < docus.length; i++) {
    let doc = docus[i];
    let product_data = doc.data();
    let reference = ref(storage, product_data.image_folder);
    let imglist = await list(reference);
    let url = await getDownloadURL(imglist.items[0]);
    let prod_id = doc.id;

    console.log(prod_id)

    let more_from_artist = `<div class="col-lg-4" style="flex: 1 0 25%;">
    <div class="artist-more-img">
        <div class="artist-more-pic">
            <a href="shop_single.html?prodid=${prod_id}">
            <img src="${url}" style="width:30vw;height:40vh;object-fit: cover;">
        </div>
    </div>
    </div>`

    var div = document.createElement('div');
    div.innerHTML = more_from_artist.trim();
    let child = div.firstChild;
    elt.appendChild(child);
}