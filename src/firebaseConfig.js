// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBMWt7kGEOheVHpvxqtqx8Eb5AaD_bfDcc",
    authDomain: "hackathon-1a653.firebaseapp.com",
    projectId: "hackathon-1a653",
    storageBucket: "hackathon-1a653.appspot.com",
    messagingSenderId: "257751249392",
    appId: "1:257751249392:web:ed4d9093999b2f93596d35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);