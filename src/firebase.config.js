
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
            apiKey: "AIzaSyC-gMBELOKa5EOpy5hvgRGgGP2BSFGcUQc",
            authDomain: "house-marketplace-app-8fc29.firebaseapp.com",
            projectId: "house-marketplace-app-8fc29",
            storageBucket: "house-marketplace-app-8fc29.appspot.com",
            messagingSenderId: "480845917453",
            appId: "1:480845917453:web:cc2eeb62ae1d7a4e805444"
    };



// Initialize Firebase

initializeApp(firebaseConfig)
export const db = getFirestore()