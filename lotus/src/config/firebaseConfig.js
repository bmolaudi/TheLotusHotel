import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Your web app's Firebase configuration
// var firebaseConfig = {
//   apiKey: "AIzaSyBcBrE9kL8wJ9oujWz02rMVH49j5EuP4No",
//   authDomain: "hotellotus-4e039.firebaseapp.com",
//   databaseURL: "https://hotellotus-4e039.firebaseio.com",
//   projectId: "hotellotus-4e039",
//   storageBucket: "hotellotus-4e039.appspot.com",
//   messagingSenderId: "953193570376",
//   appId: "1:953193570376:web:819594ad15ae3cb434387d",
// };


var firebaseConfig = {
  apiKey: "AIzaSyBbDeHWzNHRadQ-cOd3AGJHSVCd2frRwc8",
  authDomain: "lotushotel-3d458.firebaseapp.com",
  databaseURL: "https://lotushotel-3d458.firebaseio.com",
  projectId: "lotushotel-3d458",
  storageBucket: "lotushotel-3d458.appspot.com",
  messagingSenderId: "538186330795",
  appId: "1:538186330795:web:26931286a1acb66094bdee",
  measurementId: "G-LCQCBH0P7D"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;

export async function counter ()  {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
  const createdAt = new Date().getDate();
  var counter = 0;
  console.log(counter);

  const booking = await firestore.collection("/counters").doc(`${createdAt}`).get();
  if (booking.data()){
    
 
    counter = booking.data().counter;
    console.log(counter);
   
 }
  else{
    counter = 0;
  }

  firestore.collection("/counters").doc(`${createdAt}`).set({
    counter: 1 + counter
  })
}

export async function getCouneter(id) {
  
  const booking = await firestore.collection("/counters").doc(`${id}`).get();
  if (booking.data()){
    
 return (
  booking.data()
   );
 }
  else{
      return 0;
  }
  
}

  export async function updateBooking ( id, Customer, Status, checkIn, checkOut, numberOfGuests,roomNumber,AdditionalInformation)  {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
  if (!Customer) return;
  console.log(Customer);
  const createdAt = new Date();
  firestore.collection("/bookings").doc(`${id}`).set({
    Customer,
    Status,
    checkIn,
    checkOut,
    numberOfGuests,
    roomNumber,
    AdditionalInformation
  })
  .then(function() {
      console.log("Document successfully editted!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  })
}

  export async function addBooking (Customer, Status, checkIn, checkOut, numberOfGuests,roomNumber,AdditionalInformation)  {
  require("firebase/firestore");
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("problem Resolved");
}
  if (!Customer) return;
  const createdAt = new Date();
  
  const uid = createdAt.toISOString();
  console.log(uid);
  console.log(Customer);
  firestore.collection("/bookings").doc(`${uid}`).set({
      Customer,
      Status,
      checkIn,
      checkOut,
      numberOfGuests,
      roomNumber,
      AdditionalInformation
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  })
}

export async function deleteBooking (uid) {
  if (!uid) return;
  firestore.collection("/bookings").doc(`${uid}`).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
}

export async function getBookingDetails() {
  try {
      const snapshot = await firestore.collection('/bookings')
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

export async function getRooms() {
  try {
      const snapshot = await firestore.collection('/rooms')
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

export async function getRoomsNumber() {
  try {
      const snapshot = await firestore.collection('/rooms')
      .get();
      console.log(snapshot.size)
      return snapshot.size;
  }
  catch (e) {
      console.log(e);

  }
}


export async function getUserNumber() {
  try {
      const snapshot = await firestore.collection('/user')
      .get();
      console.log(snapshot.size)
      return snapshot.size;
  }
  catch (e) {
      console.log(e);

  }
}

export async function getOccupiedRooms() {
  const booking = await firestore.collection("bookings").where("Status", "==","CheckIn").get();
  if (booking){
    console.log(booking.size);
 return (booking.size);
  }
  else{
      return null;
  }
  
}

export async function getBooking(email) {
  console.log(email);
  const booking = await firestore.collection("bookings").where("Customer", "==",email).limit(1).get();
  if (booking){
    console.log(booking);
 return ({
   id: booking.docs[0].id,
   ...booking.docs[0].data()});
  }
  else{
      return null;
  }
  
}

export async function getUserType(email) {
  console.log(email);
  const user = await firestore.collection("user").where("email", "==",email).limit(1).get();
  if (user){
    var data = user.docs[0].data();
    var userType = data.userType;
    console.log(userType)
    if (userType){
      return userType;
    }
    else 
      return "guest";
  
}
}

