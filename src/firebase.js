import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOkimZi6ACjsxrWtsb-A9H0UT6QUw2JUo",
  authDomain: "pattarai-workshop-01.firebaseapp.com",
  projectId: "pattarai-workshop-01",
  storageBucket: "pattarai-workshop-01.appspot.com",
  messagingSenderId: "357177618006",
  appId: "1:357177618006:web:ddd22beab2e00cd80995f7"
};

firebase.initializeApp(firebaseConfig);