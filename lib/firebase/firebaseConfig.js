import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpUWZ9t1jBLt2P_mSExCch3LqtZ9lrOxM",
  authDomain: "blog-convertixy.firebaseapp.com",
  projectId: "blog-convertixy",
  storageBucket: "blog-convertixy.firebasestorage.app",
  messagingSenderId: "166737540048",
  appId: "1:166737540048:web:6f6db829ab19b51d65bfd5",
  measurementId: "G-FQ6FNGZFK6",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();
const db = getFirestore(app, "blogconvertixy");

export { app, auth, db };
