"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const company_controller_1 = require("./controllers/company.controller");
const review_controller_1 = require("./controllers/review.controller");
const bus_route_controller_1 = require("./controllers/bus_route.controller");
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
// sample route
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: "hello" });
}));
// bus_route routes
app.post("/api/routes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const origin = req.body.origin; // "NYC" or "Ithaca"
    const destination = req.body.destination; // "NYC" or "Ithaca"
    const date = new Date(req.body.date);
    try {
        const busRoutes = yield (0, bus_route_controller_1.getBusRoutes)(origin, destination, date);
        console.log(date);
        res.status(200).send({
            message: `SUCCESS retrieved bus routes for ${origin} to ${destination} on ${date}`,
            data: busRoutes,
        });
    }
    catch (err) {
        res.status(500).json({
            error: `ERROR: an error occurred in the /api/routes endpoint: ${err}`,
        });
    }
}));
// company routes
app.get("/api/companies", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield (0, company_controller_1.getAllCompanies)();
        res.status(200).send({
            message: `SUCCESS retrieved ${companies} from the bus_companies collection in Firestore`,
            data: companies,
        });
    }
    catch (err) {
        res.status(500).json({
            error: `ERROR: an error occurred in the /api/companies endpoint: ${err}`,
        });
    }
}));
app.get("/api/companies/:companyId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const companyId = req.params.companyId;
    try {
        const company = yield (0, company_controller_1.getCompany)(companyId);
        if (company === null) {
            res
                .status(404)
                .send({
                error: `ERROR: company with companyId: ${companyId} not found in Firestore`,
            });
        }
        else {
            res.status(200).send({
                message: `SUCCESS retrieved company with companyId: ${companyId} from the companies collection in Firestore`,
                data: company,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: `ERROR: an error occurred in the /api/companies/:companyId endpoint: ${err}`,
        });
    }
}));
app.get("/api/companies/:companyId/averageRating", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const companyId = req.params.companyId;
    try {
        const averageRating = yield (0, company_controller_1.getAverageRating)(companyId);
        if (averageRating === null) {
            res
                .status(404)
                .send({
                error: `ERROR: average rating of company with companyName: ${companyId} not found in Firestore`,
            });
        }
        else {
            res.status(200).send({
                message: `SUCCESS retrieved average rating of company with companyName: ${companyId} from the companies collection in Firestore`,
                data: averageRating,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: `ERROR: an error occurred in the /api/companies/:company/averageRating endpoint: ${err}`,
        });
    }
}));
// review routes
// add review
app.post("/api/reviews/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[POST] entering '/reviews/create' endpoint");
    // rideDate is in "YYYY-MM-DD" format
    // dateTimeOfPosting is in standard ISO format: "yyyy-MM-dd'T'HH:mm:ss"
    // console.log(rideDate);
    const review = {
        "busCompanyId": req.body.busCompanyId,
        "rideDate": req.body.rideDate,
        "ridePrice": req.body.ridePrice,
        "rideOrigin": req.body.rideOrigin,
        "rideDestination": req.body.rideDestination,
        "title": req.body.title,
        "rating": req.body.rating,
        "reviewText": req.body.reviewText,
        "userName": req.body.userName,
        "reviewDateTime": req.body.reviewDateTime,
    };
    try {
        yield (0, review_controller_1.addReview)(review);
        res.status(200).send({
            message: `SUCCESS added review from ${req.body.userName} to the reviews collection in Firestore`,
        });
    }
    catch (err) {
        res.status(500).json({
            error: `ERROR: an error occurred in the /api/reviews/create endpoint: ${err}`,
        });
    }
}));
// get reviews by company
app.get("/api/reviews/:companyId/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const companyId = req.params.companyId;
    try {
        const company = yield (0, company_controller_1.getCompany)(companyId);
        if (company === null) {
            res
                .status(404)
                .send({
                error: `ERROR: company with companyName: ${companyId} not found in Firestore`,
            });
        }
        else {
            let reviews = yield (0, review_controller_1.getReviewsByCompany)(companyId);
            res.status(200).send({
                message: `SUCCESS retrieved reviews associated wiht companyName: ${companyId} from the reviews collection in Firestore`,
                data: reviews,
            });
            console.log(reviews);
        }
    }
    catch (err) {
        res.status(500).json({
            error: `ERROR: an error occurred in the /api/companies/:company endpoint: ${err}`,
        });
    }
}));
// delete specific review
app.delete("/api/reviews/:review_id/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewId = req.params.review_id;
    try {
        yield (0, review_controller_1.deleteReview)(reviewId);
        res.status(200).send({
            message: `SUCCESS deleted review with : ${reviewId} from the reviews collection in Firestore`,
        });
    }
    catch (err) {
        res.status(500).json({
            error: `ERROR: an error occurred in the /api/reviews/:review_id/delete endpoint: ${err}`,
        });
    }
}));
// listening on port
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
//# sourceMappingURL=index.js.map