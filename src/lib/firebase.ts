import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAJ6IJDsroHqfEa9jPC4zTXp2uOo5nPIQQ",
  authDomain: "edustream-819cf.firebaseapp.com",
  projectId: "edustream-819cf",
  storageBucket: "edustream-819cf.firebasestorage.app",
  messagingSenderId: "468294251580",
  appId: "1:468294251580:web:3a40ce26eaee9c719cff39",
  measurementId: "G-1JGM1SREVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// সার্ভিসগুলো এক্সপোর্ট করা হচ্ছে যাতে অন্য ফাইলে ব্যবহার করা যায়
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;