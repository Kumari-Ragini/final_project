import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHQNB0ICTZ6DGgFqrkHKDjMqSKmhHI8aU",
  authDomain: "efixpro-e0346.firebaseapp.com",
  projectId: "efixpro-e0346",
  storageBucket: "efixpro-e0346.appspot.com",
  messagingSenderId: "327110619663",
  appId: "1:327110619663:web:9d79de4e615301785da97a",
  measurementId: "G-2STXKH15KJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app)
export { db, storage, auth };
