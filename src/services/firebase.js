import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBmvCOT554ldxcCX67iqay2KSX31fjsJ7Y",
  authDomain: "piniks-58e39.firebaseapp.com",
  databaseURL: "https://piniks-58e39.firebaseio.com",
  projectId: "piniks-58e39",
  storageBucket: "piniks-58e39.appspot.com",
  messagingSenderId: "844240529798",
  appId: "1:844240529798:web:d2a1d6e6a7922aef1e2407"
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
export const firestore = firebase.firestore();
