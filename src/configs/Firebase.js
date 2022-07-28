// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBSEisfjTG5WXa8gEahS3ZCmujFFBebx8",
  authDomain: "movie-app-dfe41.firebaseapp.com",
  projectId: "movie-app-dfe41",
  storageBucket: "movie-app-dfe41.appspot.com",
  messagingSenderId: "454814393367",
  appId: "1:454814393367:web:3208ec63ae4011150e6852"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// export {auth};