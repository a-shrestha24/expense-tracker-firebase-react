// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//used in the authentication of user. Using google auth
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4bAuQiaWxC2UcS4DBGRfkN2zaE_10BvU",
  authDomain: "expense-tracker-3b3c7.firebaseapp.com",
  projectId: "expense-tracker-3b3c7",
  storageBucket: "expense-tracker-3b3c7.appspot.com",
  messagingSenderId: "852390461616",
  appId: "1:852390461616:web:18c56ff11eeaa996b6fb75",
  measurementId: "G-SP3CYGCRTZ"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// //both of these functions are imported from firebase, and they are exported to the 
// //index.jsx file to authenticate the user. It is used within the signInWithPopup(auth,provider)function. 
// export const auth = getAuth(app)
// export const provider = new GoogleAuthProvider();

// export const db = getFirestore(app);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);


//firebase login
//firebase init
//firebase deploy