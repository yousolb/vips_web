import {artist_col, storage, fires, setSRC, setHTML } from './firebase.mjs'
import { getStorage, ref, list, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js'
import { query, orderBy, getFirestore, collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'

let qs = await getDocs(query(artist_col, orderBy('fav_animal')));
let docus = qs.docs;
let elt = document.querySelector(`.staff-items`);

for(let i = 0; i < docus.length; i++) {
    let doc = docus[i];
    let artist_data = doc.data();
    let reference = ref(storage, artist_data.image);
    let url = await getDownloadURL(reference);
    let artist_id = doc.id;
    console.log(artist_data.name)

    let collection_items = `<div>
    <div class="volunteers-items">
        <div class="volunteers-img">
            <img src="${url}" alt="volunteers-img-1" class="img-responsive" />
        </div>
        <div class="volunteers-content">
            <h4>${artist_data.name}</h4>
            <i>${artist_data.label}</i>
            <p>Favorite animal: ${artist_data.fav_animal}</p>
            <p>${artist_data.description}</p>
        </div>
    </div>
</div>`

    var div = document.createElement('div');
    div.innerHTML = collection_items.trim();
    let child = div.firstChild;
    elt.appendChild(child);

}