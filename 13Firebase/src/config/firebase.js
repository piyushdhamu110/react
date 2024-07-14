// Import the functions you need from the SDKs you need

// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCCqPfOv1nB7dIfr0PCuG-BUwj_KuuG4AQ",
  authDomain: "fir-course2-61aca.firebaseapp.com",
  projectId: "fir-course2-61aca",
  storageBucket: "fir-course2-61aca.appspot.com",
  messagingSenderId: "440562418222",
  appId: "1:440562418222:web:8485ddd32ff177876295bf",
  measurementId: "G-FCF8VVSK99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db =getFirestore(app);
export const storage = getStorage(app);
