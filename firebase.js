// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAD8lz8Kv6sbqy6CcyDYl6l8igS5tiGH1Y",
  authDomain: "todo-app-6a22c.firebaseapp.com",
  projectId: "todo-app-6a22c",
  storageBucket: "todo-app-6a22c.appspot.com",
  messagingSenderId: "169395681798",
  appId: "1:169395681798:web:a794a8e0775e64fa2ba187",
  measurementId: "G-DCFLTG4GPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }
