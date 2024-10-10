import {materials_and_sourcing_col, storage, fires, setSRC, setHTML } from './firebase.mjs'
import { getStorage, ref, list, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js'
import { query, orderBy, getFirestore, collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'

let qs = await getDocs(query(materials_and_sourcing_col));
let docus = qs.docs;
let secondhand_reused = document.querySelector('#secondhand-reused');
let retail = document.querySelector('#retail');


for(let i = 0; i < docus.length; i++) {
    let doc = docus[i];
    let material_data = doc.data();
    let reference = ref(storage, material_data.image);
    let url = await getDownloadURL(reference);
    
    let artist_id = doc.id;
    console.log(material_data.name)
    console.log(material_data.image)

    let collection_items = 
    `<div>
        <div class="materials-item">
            <img src="${url}" alt="materials-img-1"/>
            <div class="materials-item-content">
                <p><b>${material_data.name}</b></p>
                <p>${material_data.description}</p>
            </div>
        </div>
    </div>`

//     let collection_items = `<div>
//     <div class="volunteers-items">
//         <div class="volunteers-img">
//             <img src="${url}" alt="volunteers-img-1" class="img-responsive" />
//         </div>
//         <div class="volunteers-content">
//             <h4>${material_data.name}</h4>
//             <i>${artist_data.label}</i>
//             <p>Favorite animal: ${artist_data.fav_animal}</p>
//             <p>${artist_data.description}</p>
//         </div>
//     </div>
// </div>`

    var div = document.createElement('div');
    div.innerHTML = collection_items.trim();
    let child = div.firstChild;

    if (material_data.type == 'secondhand-reused') {
        secondhand_reused.appendChild(child);
    }

    if (material_data.type == 'retail') {
        retail.appendChild(child);
    }
}