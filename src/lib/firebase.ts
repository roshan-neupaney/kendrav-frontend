import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { env } from '$env/dynamic/public'; // Loads variables at runtime

const firebaseConfig = {
  apiKey: "AIzaSyCbOPK-xRP1Z4OT1Dk3NOmleAfEbaQDBVg",
  authDomain: "kendrav-7be14.firebaseapp.com",
  projectId: "kendrav-7be14",
  storageBucket: "kendrav-7be14.firebasestorage.app",
  messagingSenderId: "830274638140",
  appId: "1:830274638140:web:f7382865b761489003ce39",
  measurementId: "G-SZEVL447D8"
};

// Initialize Firebase (Singleton pattern prevents re-initialization errors)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize and export services you need
export const auth = getAuth(app);
export const db = getFirestore(app);
export { app };
