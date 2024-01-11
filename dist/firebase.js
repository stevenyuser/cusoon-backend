"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// @ts-nocheck
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const service_account_json_1 = __importDefault(require("./service_account.json"));
const app = (0, app_1.initializeApp)({
    credential: (0, app_1.cert)(service_account_json_1.default),
});
const db = (0, firestore_1.getFirestore)();
exports.db = db;
//# sourceMappingURL=firebase.js.map