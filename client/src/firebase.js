import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVIy7lCk5TKx9nTkD2ZtLmW7SbHJZtSo4",
  authDomain: "note-maker-app-6efb9.firebaseapp.com",
  projectId: "note-maker-app-6efb9",
  storageBucket: "note-maker-app-6efb9.appspot.com",
  messagingSenderId: "653453396162",
  appId: "1:653453396162:web:82d53965f9bd4d2139535b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
