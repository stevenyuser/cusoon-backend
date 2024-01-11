import express, { Express } from "express"
import cors from "cors"

import { getAllCompanies, getCompany, getAverageRating } from "./controllers/company.controller";
import { addReview, getReviewsByCompany, deleteReview } from "./controllers/review.controller";
import { getBusRoutes } from "./controllers/bus_route.controller";
import { Review } from "./types";

import { GeneralLocations } from "./types";

const app: Express = express()
const port = 8080

app.use(express.json())
app.use(cors())

// sample route
app.get("/", async (req, res) => {
    res.status(200).json({ message: "hello" })
})

// bus_route routes

app.post("/api/routes", async (req, res) => {
    const origin = req.body.origin as GeneralLocations; // "NYC" or "Ithaca"
    const destination = req.body.destination as GeneralLocations; // "NYC" or "Ithaca"
    const date = new Date(req.body.date);

    try {
        const busRoutes = await getBusRoutes(origin, destination, date);
        console.log(date);
        res.status(200).send({
            message: `SUCCESS retrieved bus routes for ${origin} to ${destination} on ${date}`,
            data: busRoutes,
        });
    } catch (err) {
        res.status(500).json({
            error: `ERROR: an error occurred in the /api/routes endpoint: ${err}`,
        });
    }
})

// company routes

app.get("/api/companies", async (req, res) => {
    try {
        const companies = await getAllCompanies();
        res.status(200).send({
            message: `SUCCESS retrieved ${companies} from the bus_companies collection in Firestore`,
            data: companies,
        });
    } catch (err) {
        res.status(500).json({
            error: `ERROR: an error occurred in the /api/companies endpoint: ${err}`,
        });
    }
});

app.get("/api/companies/:companyId", async (req, res) => {
    const companyId: string = req.params.companyId;

    try {
        const company = await getCompany(companyId);

        if (company === null) {
            res
                .status(404)
                .send({
                    error: `ERROR: company with companyId: ${companyId} not found in Firestore`,
                });
        } else {
            res.status(200).send({
                message: `SUCCESS retrieved company with companyId: ${companyId} from the companies collection in Firestore`,
                data: company,
            });
        }
    } catch (err) {
        res.status(500).json({
            error: `ERROR: an error occurred in the /api/companies/:companyId endpoint: ${err}`,
        });
    }
});


app.get("/api/companies/:companyId/averageRating", async (req, res) => {
    const companyId: string = req.params.companyId;

    try {
        const averageRating = await getAverageRating(companyId);

        if (averageRating === null) {
            res
                .status(404)
                .send({
                    error: `ERROR: average rating of company with companyName: ${companyId} not found in Firestore`,
                });
        } else {
            res.status(200).send({
                message: `SUCCESS retrieved average rating of company with companyName: ${companyId} from the companies collection in Firestore`,
                data: averageRating,
            });
        }
    } catch (err) {
        res.status(500).json({
            error: `ERROR: an error occurred in the /api/companies/:company/averageRating endpoint: ${err}`,
        });
    }
})

// review routes

// add review
app.post("/api/reviews/create", async (req, res) => {
    console.log("[POST] entering '/reviews/create' endpoint");
    // rideDate is in "YYYY-MM-DD" format
    // dateTimeOfPosting is in standard ISO format: "yyyy-MM-dd'T'HH:mm:ss"

    // console.log(rideDate);
    const review: Review = {
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
        await addReview(review);
        res.status(200).send({
            message: `SUCCESS added review from ${req.body.userName} to the reviews collection in Firestore`,
        });
    } catch (err) {
        res.status(500).json({
            error: `ERROR: an error occurred in the /api/reviews/create endpoint: ${err}`,
        })
    }
}
)


// get reviews by company
app.get("/api/reviews/:companyId/all", async (req, res) => {
    const companyId: string = req.params.companyId;

    try {
        const company = await getCompany(companyId);

        if (company === null) {
            res
                .status(404)
                .send({
                    error: `ERROR: company with companyName: ${companyId} not found in Firestore`,
                });
        } else {
            let reviews = await getReviewsByCompany(companyId);
            res.status(200).send({
                message: `SUCCESS retrieved reviews associated wiht companyName: ${companyId} from the reviews collection in Firestore`,
                data: reviews,
            });
            console.log(reviews);
        }
    } catch (err) {
        res.status(500).json({
            error: `ERROR: an error occurred in the /api/companies/:company endpoint: ${err}`,
        });
    }
});

// delete specific review
app.delete("/api/reviews/:review_id/delete", async (req, res) => {

    const reviewId: string = req.params.review_id;

    try {
        await deleteReview(reviewId);
        res.status(200).send({
            message: `SUCCESS deleted review with : ${reviewId} from the reviews collection in Firestore`,
        });
    } catch (err) {
        res.status(500).json({
            error: `ERROR: an error occurred in the /api/reviews/:review_id/delete endpoint: ${err}`,
        });
    }
});




// listening on port
app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})