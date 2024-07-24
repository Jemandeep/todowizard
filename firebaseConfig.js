import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvtBy0Vxzq2TdEev1juy_JUlItkqr2AGg",
  authDomain: "todowizard-d06ad.firebaseapp.com",
  projectId: "todowizard-d06ad",
  storageBucket: "todowizard-d06ad.appspot.com",
  messagingSenderId: "1010914940002",
  appId: "1:1010914940002:web:9166d2b4f56dfa2180ad3b",
  measurementId: "G-LR5NKK9368"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

export { db };
