// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYWesXBWPshubBn2uW-XY9tsZuSvsskiM",
  authDomain: "cross-game-fb6e4.firebaseapp.com",
  projectId: "cross-game-fb6e4",
  storageBucket: "cross-game-fb6e4.appspot.com",
  messagingSenderId: "159829132486",
  appId: "1:159829132486:web:be42365921a3bd287e03c7",
  measurementId: "G-BHMDWE25P1"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const databaseApp = getFirestore(app);
