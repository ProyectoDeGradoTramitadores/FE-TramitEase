import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDRmuc32yaG9Yqg25FJ3b5m_kSpw2AYMnI",
    authDomain: "proyectodegrado-8bde5.firebaseapp.com",
    projectId: "proyectodegrado-8bde5",
    storageBucket: "proyectodegrado-8bde5.appspot.com",
    messagingSenderId: "712006684113",
    appId: "1:712006684113:web:78027d1dd82b34e0f564f0",
    measurementId: "G-X723JK9GB5"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
