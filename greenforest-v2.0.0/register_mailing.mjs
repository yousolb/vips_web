// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { collection, getDocs, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBoIm35xD9Ad1Y5Oa722YYLtbf2zDB3JpM",
    authDomain: "vips-web-5807a.firebaseapp.com",
    databaseURL: "https://vips-web-5807a-default-rtdb.firebaseio.com",
    projectId: "vips-web-5807a",
    storageBucket: "vips-web-5807a.appspot.com",
    messagingSenderId: "754667322013",
    appId: "1:754667322013:web:9e8aa13cdb809647d7b274",
    measurementId: "G-Z0K73YT1E3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getUsers(db) {
    const userCol = collection(db, 'mailing-list');
    const userSnapshot = await getDocs(userCol);
    const userList = userSnapshot.docs.map(doc => doc.data());
    return userList;
}

async function addUser(db, inEmail, inFName, inLName) {
    const userCol = collection(db, 'mailing-list');
    const myDocumentData = {
        email: inEmail,
        fname: inFName,
        lname: inLName,
    };

    // Add the document to the collection
    const newDocRef = await addDoc(userCol, myDocumentData);
}

const alertBar = document.getElementById('alertContainer')
const appendAlert = (message, type) => {
    alertBar.innerHTML = "";
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '</div>'
    ].join('')

    alertBar.append(wrapper)
}

document.getElementById("test-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);

    const userList = await getUsers(db);
    console.log(userList);
    const userExists = userList.find((user) => user["email"] == formProps["email"])
    console.log(userExists);

    if (userExists) {
        appendAlert("Email already in use! Please try a different one.", 'danger');
    } else {
        appendAlert('You\'re signed up!', 'success')
        addUser(db, formProps['email'], formProps['fname'], formProps['lname']);
    }

});

