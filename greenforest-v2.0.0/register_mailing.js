// Import the functions you need from the SDKs you need
import { fires as db } from "./firebase.js"
import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js"

const userCol = collection(db, 'mailing-list')

async function getUsers() {
    const userSnapshot = await getDocs(userCol);
    console.log(userSnapshot)
    const userList = userSnapshot.docs.map(doc => doc.data());
    return userList;
}

async function addUser(inEmail) {
    const myDocumentData = {
        email: inEmail,
    };

    // Add the document to the collection
    const newDocRef = await addDoc(userCol, myDocumentData);
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("mailing-form");
    form.addEventListener("submit", handleSubmit);
});

const alertBar = document.getElementById('alert-container')
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


async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);

    const userList = await getUsers();
    console.log(userList);
    const userExists = userList.find((user) => user["email"] == formProps["email"])
    console.log(userExists);

    if (userExists) {
        appendAlert("Email already in use! Please try a different one.", 'danger');
    } else {
        appendAlert('You\'re signed up!', 'success')
        addUser(formProps['email']);
    }

};
