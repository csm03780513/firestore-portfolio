import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyBpTxQSohLkSaiP_MpcmgoMES2z8lhKkYE",
//     authDomain: "moringa-assignment.firebaseapp.com",
//     projectId: "moringa-assignment",
//     storageBucket: "moringa-assignment.firebasestorage.app",
//     messagingSenderId: "706211488090",
//     appId: "1:706211488090:web:5f3aeba10dbb2b36d49363"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const firebaseConfig = {
    apiKey: "AIzaSyBpTxQSohLkSaiP_MpcmgoMES2z8lhKkYE",
    authDomain: "moringa-assignment.firebaseapp.com",
    projectId: "moringa-assignment",
    storageBucket: "moringa-assignment.firebasestorage.app",
    messagingSenderId: "706211488090",
    appId: "1:706211488090:web:5f3aeba10dbb2b36d49363"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
