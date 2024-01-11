// @ts-nocheck
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
// import serviceAccount from "./service_account.json";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

const app = initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();

export { db };