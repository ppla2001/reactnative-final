import firebase from "firebase";
import app from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA_7vpIprh7xHCenCTV_m5WjmFoRCYpHr4",
  authDomain: "final-react-native.firebaseapp.com",
  projectId: "final-react-native",
  storageBucket: "final-react-native.appspot.com",
  messagingSenderId: "773008556399",
  appId: "1:773008556399:web:85f8e90010274d3ec6689a",
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
