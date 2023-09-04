import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgzP6BzLqL9pJ-sycVX8-C6GLMB7ogMAo",
  authDomain: "photofolio-70306.firebaseapp.com",
  projectId: "photofolio-70306",
  storageBucket: "photofolio-70306.appspot.com",
  messagingSenderId: "636751047008",
  appId: "1:636751047008:web:dc0f56525f7c0788049605"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
