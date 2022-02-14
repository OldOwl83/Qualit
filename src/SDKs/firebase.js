// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getAuth } from "firebase/auth";
import 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFNzYjEmk4OQwyeMWI9GETd7h3GCaK_eI",
  authDomain: "qualit-oldowl83.firebaseapp.com",
  projectId: "qualit-oldowl83",
  storageBucket: "qualit-oldowl83.appspot.com",
  messagingSenderId: "43494656675",
  appId: "1:43494656675:web:55e8c256a763da31760d16",
  measurementId: "G-L3GCG4BP28"
};

// Initialize Firebase
export const firebaseApp = initializeApp( firebaseConfig );

export const authentication = getAuth( firebaseApp );
export const db = getFirestore( firebaseApp );
export const storage = getStorage( firebaseApp );

// const analytics = getAnalytics(app);