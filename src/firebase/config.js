import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwf45Itfe6fYEBP_B8q2NRjE5qKTWgOfg",
  authDomain: "yelp-87c87.firebaseapp.com",
  projectId: "yelp-87c87",
  storageBucket: "yelp-87c87.appspot.com",
  messagingSenderId: "784494498014",
  appId: "1:784494498014:web:0730ef0e96b2bbefd9f24f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}