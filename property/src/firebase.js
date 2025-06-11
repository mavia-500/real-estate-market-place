// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-property-project-16439.firebaseapp.com",
  projectId: "mern-property-project-16439",
  storageBucket: "mern-property-project-16439.firebasestorage.app",
  messagingSenderId: "599764902023",
  appId: "1:599764902023:web:b0725f24b0051b0dc4d822"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);