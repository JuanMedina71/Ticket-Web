// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBy9SzV91WfM6m4pXM2-ldk7b9yEyx6Mgw",
  authDomain: "ticket-generator-4c30a.firebaseapp.com",
  projectId: "ticket-generator-4c30a",
  storageBucket: "ticket-generator-4c30a.appspot.com",
  messagingSenderId: "274198722991",
  appId: "1:274198722991:web:e1da9fdf476a9cce61575a"
};


recaptcha: {
  siteKey: '6LcDmsooAAAAAIqBRfHqfBA72pTZ26jSxjaUzEfa'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
