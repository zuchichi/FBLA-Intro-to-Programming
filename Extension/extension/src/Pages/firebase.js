// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgfcCz3IZw0XORwasZLlM0a3LOh_69ot4",
  authDomain: "redpie-database.firebaseapp.com",
  databaseURL: "https://redpie-database-default-rtdb.firebaseio.com",
  projectId: "redpie-database",
  storageBucket: "redpie-database.firebasestorage.app",
  messagingSenderId: "496583467436",
  appId: "1:496583467436:web:06e16f77a55170680eda09",
  measurementId: "G-CBCYE34N2P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);