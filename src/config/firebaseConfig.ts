// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "woohakdong.firebaseapp.com",
  projectId: "woohakdong",
  storageBucket: "woohakdong.appspot.com",
  messagingSenderId: "896551790902",
  appId: "1:896551790902:web:5687f55fa2bdb117816b97",
  measurementId: "G-QXL9GKHGRK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export { app, auth };
