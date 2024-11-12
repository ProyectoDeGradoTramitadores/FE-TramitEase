import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDpw2AYMnI",
    authDomain: "proyectodegrado-8bde5.firebaseapp.com",
    projectId: "proyectodegrado-8bde5",
    storageBucket: "proyectodegrado-8bde5.appspot.com",
    messagingSenderId: "712006684113",
    appId: "1:712006684113:web:78027d4f0",
    measurementId: "G-X725"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const storage = getStorage(app);

export default app;
