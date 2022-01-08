import { initializeApp } from "firebase/app"
import { getAuth } from "@firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDOkimZi6ACjsxrWtsb-A9H0UT6QUw2JUo",
  authDomain: "pattarai-workshop-01.firebaseapp.com",
  projectId: "pattarai-workshop-01",
  storageBucket: "pattarai-workshop-01.appspot.com",
  messagingSenderId: "357177618006",
  appId: "1:357177618006:web:ddd22beab2e00cd80995f7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);