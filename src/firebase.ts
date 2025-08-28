// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from  "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBm0VULyVQXQe3aI2ySSOKLWb-3pA8wxZc",
  authDomain: "kakeibo-130f6.firebaseapp.com",
  projectId: "kakeibo-130f6",
  storageBucket: "kakeibo-130f6.firebasestorage.app",
  messagingSenderId: "743759441065",
  appId: "1:743759441065:web:a20e667d9e2c74b4b90db8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };