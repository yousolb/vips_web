import {artist_col, storage, fires, setSRC, setHTML } from './firebase.mjs'
import { getStorage, ref, list, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js'
import { query, orderBy, getFirestore, collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'

let qs = await getDocs(query(artist_col, orderBy('fav_animal')));
let docus = qs.docs;
let elt = document.querySelector(`.staff-items`);

for(let i = 0; i < docus.length; i++) {
    let doc = docus[i];
    let product_data = doc.data();
    let reference = ref(storage, product_data.image);
    let url = await getDownloadURL(reference);
    let prod_id = doc.id;
    console.log(product_data.name)

    let collection_items = `<div class="col-lg-3 col-sm-6 col-12">
    <div class="volunteers-items">
        <div class="volunteers-img">
            <img src="${url}" alt="volunteers-img-1" class="img-responsive" />
        </div>
        <div class="volunteers-content">
            <h4><a href="team_single.html?prodid=${prod_id}">${product_data.name}</a></h4>
            <p>${product_data.label}</p>
        </div>
    </div>
</div>`

    var div = document.createElement('div');
    div.innerHTML = collection_items.trim();
    let child = div.firstChild;
    elt.appendChild(child);

}