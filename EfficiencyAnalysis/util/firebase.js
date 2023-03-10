// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs5-x1ShYDngW8gNcv8FiepKZBjwuFHCM",
  authDomain: "firsttrial-cff1d.firebaseapp.com",
  databaseURL: "https://firsttrial-cff1d-default-rtdb.firebaseio.com",
  projectId: "firsttrial-cff1d",
  storageBucket: "firsttrial-cff1d.appspot.com",
  messagingSenderId: "453436676208",
  appId: "1:453436676208:web:44505929a6e806e2fe7cb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);