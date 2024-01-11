"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// @ts-nocheck
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
// vercel env 
const app = (0, app_1.initializeApp)({
    credential: (0, app_1.cert)(process.env.FIREBASE_SERVICE_ACCOUNT_KEY),
});
const db = (0, firestore_1.getFirestore)();
exports.db = db;
//# sourceMappingURL=firebase.js.map