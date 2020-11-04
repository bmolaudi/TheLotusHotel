import {firestore} from './firebaseConfig';

export async function updateUser ( id, firstname, lastname, email, initials, userType)  {
    if (!email) return;
    const createdAt = new Date();
    firestore.collection("/user").doc(`${id}`).set({
        firstname,
        lastname,
        email,
        initials,
        userType,
    })
    .then(function() {
        console.log("Document successfully editted!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    })
  }
  
export async function addUser (firstname, lastname, email, initials, userType)  {
    if (!email) return;
    const createdAt = new Date();
    const uid = createdAt.toISOString();
    console.log(uid);
    firestore.collection("/user").doc(`${uid}`).set({
        firstname,
        lastname,
        email,
        initials,
        userType,
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    })
  }
  
  export async function deleteUser (uid) {
    if (!uid) return;
    firestore.collection("/user").doc(`${uid}`).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }
  
  export async function getUserDetails() {
    try {
        const snapshot = await firestore.collection('/user')
        .get();
        console.log(snapshot)
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()}));
    }
    catch (e) {
        console.log(e);
  
    }
  
  }