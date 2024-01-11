// @ts-nocheck

import { BusCompany, BusCompanyEnum } from "../types"
import { db } from "../firebase"

const companyCollectionRef = db.collection("bus_companies");

export const getAllCompanies = async () => {
    const snapshot = await companyCollectionRef.get();

    let companies = {};

    snapshot.forEach((doc) => {
        companies[doc.id] = doc.data() as BusCompany;
    })

    return companies;
};

export const getCompany = async (companyId: string) => {
    const companyDoc = await companyCollectionRef.doc(companyId).get();
    if (!companyDoc.exists) {
        console.log('No such document!');
        return null;
    } else {
        return companyDoc.data() as BusCompany;
    }
};


export const getAverageRating = async (companyId: string) => {
    const companyDoc = await companyCollectionRef.doc(companyId).get();
    if (!companyDoc.exists) {
        console.log('No such document!');
        return null;
    } else {
        const company = companyDoc.data() as BusCompany;
        return company.averageRating;
    }
}