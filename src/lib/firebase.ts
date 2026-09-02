import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import aiStudioConfig from '../../firebase-applet-config.json';

// --- CARA MUDAH: PASTE CONFIG FIREBASE ANDA DI SINI ---
// Hapus kata `null` di bawah dan ganti dengan object config dari dashboard Firebase Anda.
// Contoh: const myCustomConfig = { apiKey: "AIzaSy...", authDomain: "..." };
const myCustomConfig = null; 

const isCustomConfig = !!import.meta.env.VITE_FIREBASE_API_KEY;

const envConfig = isCustomConfig ? {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID
} : aiStudioConfig;

const firebaseConfig = myCustomConfig || envConfig;

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || "(default)");
export const auth = getAuth(app);

// Initialize Analytics if supported in the environment (client-side only)
if (typeof window !== 'undefined' && firebaseConfig.appId) {
  getAnalytics(app);
}
