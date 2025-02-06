import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";  

const firebaseConfig = {
  apiKey: "AIzaSyC-rV-d0hg7WCoGAq4oLzvFc0yN1wq8kbs",
  authDomain: "event-management-201f0.firebaseapp.com",
  projectId: "event-management-201f0",
  storageBucket: "event-management-201f0.firebasestorage.app",
  messagingSenderId: "65405299768",
  appId: "1:65405299768:web:8b5344a401163391850acd",
  measurementId: "G-N8L2XG1ZHE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);  
