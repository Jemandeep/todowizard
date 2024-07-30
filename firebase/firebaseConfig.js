import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import { getAnalytics, isSupported } from "firebase/analytics";

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
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Auth

console.log("Firebase has been initialized successfully.");

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  }).catch((error) => {
    console.error("Error checking Analytics support: ", error);
  });
}

export { db, auth };
