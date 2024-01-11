"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// @ts-nocheck
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
// import serviceAccount from "./service_account.json";
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
const app = (0, app_1.initializeApp)({
    credential: (0, app_1.cert)(serviceAccount),
});
const db = (0, firestore_1.getFirestore)();
exports.db = db;
//# sourceMappingURL=firebase.js.map