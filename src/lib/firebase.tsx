import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import "firebase/firestore";
import { seedDatabase } from "../seed";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAI6wUopZQZa1omla5A49ybv6-2ghYaGVg",
  authDomain: "instagram-clone-2de0d.firebaseapp.com",
  projectId: "instagram-clone-2de0d",
  storageBucket: "instagram-clone-2de0d.appspot.com",
  messagingSenderId: "242707247447",
  appId: "1:242707247447:web:32782fca4e19e44887ce12",
};
// Initialize Firebase

const firebase = initializeApp(firebaseConfig);
const FieldValue = getFirestore(firebase);


const auth = getAuth();
console.log(auth, "auth obj");
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // const uid = user.uid;

    console.log(user, "user auth info");
    // ...
  } else {
    // User is signed out
    // ...
    console.log("user signed out");
  }
});



export { firebase, FieldValue };
