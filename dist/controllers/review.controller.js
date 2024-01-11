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
exports.deleteReview = exports.getReviewsByCompany = exports.addReview = void 0;
const firebase_1 = require("../firebase");
const companyCollectionRef = firebase_1.db.collection("bus_companies");
const reviewCollectionRef = firebase_1.db.collection('reviews');
const addReview = (review) => __awaiter(void 0, void 0, void 0, function* () {
    const companyDoc = yield companyCollectionRef.doc(review.busCompanyId).get();
    if (!companyDoc.exists) {
        console.log('No such document!');
        return null;
    }
    else {
        const company = companyDoc.data();
        companyCollectionRef.doc(review.busCompanyId).update({
            "numReviews": company.numReviews + 1,
            "averageRating": (company.averageRating * company.numReviews + review.rating) / (company.numReviews + 1)
        });
    }
    const newDoc = reviewCollectionRef.doc();
    return yield newDoc.set(review);
});
exports.addReview = addReview;
const getReviewsByCompany = (companyId) => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield reviewCollectionRef.where("busCompanyId", "==", companyId).get();
    let reviews = {};
    snapshot.forEach((doc) => {
        reviews[doc.id] = doc.data();
    });
    return reviews;
});
exports.getReviewsByCompany = getReviewsByCompany;
const deleteReview = (review_id) => __awaiter(void 0, void 0, void 0, function* () {
    // const snapshot = await reviewCollectionRef.where("reviewDateTime", "==", reviewDateTime).where("userName", "==", userName).get();
    // return await snapshot.delete();
    return yield reviewCollectionRef.doc(review_id).delete();
});
exports.deleteReview = deleteReview;
//# sourceMappingURL=review.controller.js.map