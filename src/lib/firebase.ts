import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // TODO: Replace with your actual Firebase config keys
  apiKey: "AIzaSyB0Xp81PTnu7CMdhHdIuhg1sI5NxbFZ5mU",
  authDomain: "surveillance-portal-9410a.firebaseapp.com",
  projectId: "surveillance-portal-9410a",
  storageBucket: "surveillance-portal-9410a.firebasestorage.app",
  messagingSenderId: "873824995522",
  appId: "1:873824995522:web:05d68cb45d96c5d696935b"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
