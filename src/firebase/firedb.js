// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'; 

import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNCjTUclJm_V-6QZAn-mwxol7BW26ZJwo",
  authDomain: "rostami-sites.firebaseapp.com",
  projectId: "rostami-sites",
  storageBucket: "rostami-sites.appspot.com",
  messagingSenderId: "764202708776",
  appId: "1:764202708776:web:48ed396537d14361dcaa1d",
  measurementId: "G-GSLC3L9T17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// auth
export const auth = getAuth(app);

// google auth
export const googleProvider = new GoogleAuthProvider();

// fire store
export const firestore = getFirestore(app);

// storage
export const storage = getStorage(app);

//console.log('firebase is on !!');