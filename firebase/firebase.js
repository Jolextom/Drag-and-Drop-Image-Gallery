// const apiKey = import.meta.env.VITE_API_KEY;
// const authDomain = import.meta.env.VITE_AUTH_DOMAIN;
// const projectId = import.meta.env.VITE_PROJECT_ID;
// const storageBucket = import.meta.env.VITE_STORAGE_BUCKET;
// const messagingSenderId = import.meta.env.VITE_MESSAGING_SENDER_ID;
// const appId = import.meta.env.VITE_APP_ID;
// const measurementId = import.meta.env.VITE_MEASUREMENT_ID;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBd25nd09gpOUCz6FRQ73yRaXM1sKfHshg",
  authDomain: "drag-and-drop-image-uplo-95ae2.firebaseapp.com",
  projectId: "drag-and-drop-image-uplo-95ae2",
  storageBucket: "drag-and-drop-image-uplo-95ae2.appspot.com",
  messagingSenderId: "172823590569",
  appId: "1:172823590569:web:cf6145c29a1cd93aecdbb8",
  measurementId: "G-9HRYD1QD0C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
