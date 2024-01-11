"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageRating = exports.getCompany = exports.getAllCompanies = void 0;
const firebase_1 = require("../firebase");
const companyCollectionRef = firebase_1.db.collection("bus_companies");
const getAllCompanies = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield companyCollectionRef.get();
    let companies = {};
    snapshot.forEach((doc) => {
        companies[doc.id] = doc.data();
    });
    return companies;
});
exports.getAllCompanies = getAllCompanies;
const getCompany = (companyId) => __awaiter(void 0, void 0, void 0, function* () {
    const companyDoc = yield companyCollectionRef.doc(companyId).get();
    if (!companyDoc.exists) {
        console.log('No such document!');
        return null;
    }
    else {
        return companyDoc.data();
    }
});
exports.getCompany = getCompany;
const getAverageRating = (companyId) => __awaiter(void 0, void 0, void 0, function* () {
    const companyDoc = yield companyCollectionRef.doc(companyId).get();
    if (!companyDoc.exists) {
        console.log('No such document!');
        return null;
    }
    else {
        const company = companyDoc.data();
        return company.averageRating;
    }
});
exports.getAverageRating = getAverageRating;
//# sourceMappingURL=company.controller.js.map