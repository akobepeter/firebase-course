// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8TzrUokQCOKtWcDgcxyRywSOxNcycM3w",
  authDomain: "project-one-48859.firebaseapp.com",
  projectId: "project-one-48859",
  storageBucket: "project-one-48859.appspot.com",
  messagingSenderId: "458363974427",
  appId: "1:458363974427:web:bcb9435106b2a057f859be",
  measurementId: "G-CREYW41EZ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);
