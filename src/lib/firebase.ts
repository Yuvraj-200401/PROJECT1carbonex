
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-4321944193-99f83",
  "appId": "1:742465892141:web:6bb44ffd12e98c2f8f6da4",
  "storageBucket": "studio-4321944193-99f83.firebasestorage.app",
  "apiKey": "AIzaSyBN-9M46XMkUz0VHHNcaNHdC69z0SzEpSc",
  "authDomain": "studio-4321944193-99f83.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "742465892141"
};


// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
export default app;
