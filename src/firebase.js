// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkuFcbq7l1fUvCe-2k4gnGInQ5XgOVM34",
  authDomain: "react-disney-plus-app-891b6.firebaseapp.com",
  projectId: "react-disney-plus-app-891b6",
  storageBucket: "react-disney-plus-app-891b6.appspot.com",
  messagingSenderId: "343119821342",
  appId: "1:343119821342:web:4e5822e892a897f9874c0f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
