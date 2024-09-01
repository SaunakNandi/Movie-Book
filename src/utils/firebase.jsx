// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf-ouJc8jPB0dnziIJhTwhF9X2Ps-d7dA",
  authDomain: "movie-book-e65cf.firebaseapp.com",
  projectId: "movie-book-e65cf",
  storageBucket: "movie-book-e65cf.appspot.com",
  messagingSenderId: "52232908773",
  appId: "1:52232908773:web:94fb8390c99b8a672d090c",
  measurementId: "G-MBH28CM8VP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth=getAuth()