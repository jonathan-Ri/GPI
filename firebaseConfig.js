import { initializeApp } from 'firebase/app';
// Optionally import the services that you want to use
import {getAuth} from "firebase/auth";
// import {...} from "firebase/database";
import {getFirestore} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyALSIh27MZABFEoEamYYCfz3ldlE4VH0Z4",
  authDomain: "alojavalpo.firebaseapp.com",
  projectId: "alojavalpo",
  storageBucket: "alojavalpo.appspot.com",
  messagingSenderId: "1075777941405",
  appId: "1:1075777941405:web:81549c7950243a0d654974",
  measurementId: "G-HY6SFZMMNP"

};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

if ( !firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
export {firebase};
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
