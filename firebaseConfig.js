import { initializeApp } from 'firebase/app';
// Optionally import the services that you want to use
import {getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
// import {...} from "firebase/database";
import {getFirestore} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCJC2-xZJ_89r0aFmwGIwmqEQWSJMO6HOE",

  authDomain: "alojavalpo-b989a.firebaseapp.com",

  projectId: "alojavalpo-b989a",

  storageBucket: "alojavalpo-b989a.appspot.com",

  messagingSenderId: "1055324407496",

  appId: "1:1055324407496:web:123f5c0dca98b6fbd207fd",

  measurementId: "G-4N98D9FVV9"


};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage)
});
if ( !firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
export {firebase};
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
