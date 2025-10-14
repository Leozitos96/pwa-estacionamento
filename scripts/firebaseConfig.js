import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB52N1JBgWdWoxiZfobH0NxcRaNh6N3-Y8",
  authDomain: "estacionamento-pwa12.firebaseapp.com",
  projectId: "estacionamento-pwa12",
  storageBucket: "estacionamento-pwa12.firebasestorage.app",
  messagingSenderId: "1036357381383",
  appId: "1:1036357381383:web:3aebfc0703e6adb1cb29a2"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
