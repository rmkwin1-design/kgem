import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace these with your actual Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBmyD2poFYsWnjnK4cvV1x1HWASraJBPW8",
    authDomain: "korea-travel-01.firebaseapp.com",
    projectId: "korea-travel-01",
    storageBucket: "korea-travel-01.firebasestorage.app",
    messagingSenderId: "714618180927",
    appId: "1:714618180927:web:ae1d1fe00deacd3ad5af8a"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider, signInWithPopup, signOut };
