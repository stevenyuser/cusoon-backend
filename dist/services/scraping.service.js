"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.scrapeFlixbus = exports.scrapeMegabus = exports.scrapeOurBus = exports.scrapeC2C = void 0;
const cheerio = __importStar(require("cheerio"));
const types_1 = require("../types");
const helper_utils_1 = require("../utils/helper.utils");
// only scrape C2C for:
// North Campus to Cornell Club
// Cornell Club to North Campus
//
// paths:
// ITH-NYC: North, Sage, B Lot => Cornell Club, F Train, Weill Cornell
// NYC-ITH: Weill Cornell, F Train, Cornell Club => B Lot, Sage, North
const scrapeC2C = (pickup, dropoff, date) => __awaiter(void 0, void 0, void 0, function* () {
    const dateString = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(date);
    const ithToNyc = pickup === types_1.C2CLocations.IthacaNorthCampus && dropoff === types_1.C2CLocations.NYCCornellClub;
    console.log(ithToNyc);
    const response = yield fetch('https://c2cbus.ipp.cornell.edu/mobile/?a=mobile', {
        method: 'POST',
        headers: {
            'authority': 'c2cbus.ipp.cornell.edu',
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9,und;q=0.8',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'cookie': '_ga=GA1.2.2009361319.1696800467; _ga_VKE65X7QYM=GS1.2.1699445916.6.1.1699447216.0.0.0; _hp2_id.3001039959=%7B%22userId%22%3A%225517641778191662%22%2C%22pageviewId%22%3A%224596943607911114%22%2C%22sessionId%22%3A%22850780294395342%22%2C%22identity%22%3A%22uu-2-2dbef03bc8e47a3a4da24e8bb514859c22cd9810850560f7103b4dde288c80ef-GTDkw0Eah6uohqhXZ7zSk8TH1zJG9mbz7wTVI1Si%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; mode=true; ASP.NET_SessionId=2udonb2x5zo0mszyvjvfzxg5',
            'dnt': '1',
            'origin': 'https://c2cbus.ipp.cornell.edu',
            'referer': 'https://c2cbus.ipp.cornell.edu/mobile/?a=mobile',
            'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'x-microsoftajax': 'Delta=true',
            'x-requested-with': 'XMLHttpRequest'
        },
        body: new URLSearchParams({
            'ctl00$cph$smg': 'ctl00$cph$smg|ctl00$cph$btnDepCal',
            'ctl00$cph$ddlTripType': 'One Way',
            'ctl00$cph$ddlQty': '1',
            'ctl00$cph$ddlDepPickLocation': pickup,
            'ctl00$cph$ddlDepDropLocation': dropoff,
            'ctl00$cph$txtDepDate': '',
            'ctl00$cph$flDepDate': dateString,
            'vs_gid': '5c4ede3b-1e13-4026-a48a-0cb34725ed92',
            '__EVENTTARGET': '',
            '__EVENTARGUMENT': '',
            '__LASTFOCUS': '',
            '__VIEWSTATE': '',
            '__EVENTVALIDATION': '/wEdADuvVXD1oYELeveMr0vHCmYPXlcZM3fJelJ3UaDytxq3X+x5+zYa4z4HSCtrwSmTVooPsuf3hIpmkd4ZsPazLknVHmqTjAM8d+cYiIGDlL77UzgSelOshyKZzoc2yCkQK1FszKGBMKCjmoROaNRe7bbmF/KPRjsDpmXNIP1/5sUonYEpGKTZ1ALQp8cZ0zF//lyke2nKHnq75v94QSu3VOJjWuKcKzSZemme1zQ4EKI+k2DUQGvIKfMtG+4Dil/lLcK6CmifZ5sTugccxYZH4dI1OQagh1nVYy9dAxOciHDvVazv/FLRrmkvAB9pnHTqlvaWwtu6pl4b/ODkuXLvS4e2tGKSBpeLm5mi3QVL1usfPks1jfHUZmp4BxGhwjXrl7ohMo/8LncK1NgfvyJlEkTBORKqfMkC3IWWHC+rMyMqm1FZ6ddayosAM/quJc9ngG9WszwNJnBMu9h9ZMGfJMoQ6Q1vb2R6Y9bI3NRhzNt6MdLsWZl+aUUHziaY7TcfRvMrsS7NQqeLxP7GC+pSep++txPLL1718RBkI+pvQKsrp+aXlclW0wPOgzdKPISBkoU1GiFfBJhQoZ1zdNWUASEQ/8B+7Xm0fmk+PtvNiimsvfH61VViSSQ5xsfpw4dyKeM0RDibeb8dzMb6eS/aivLcXwfPN91jfYZIjys/c2Q61/OoB/TRH7UlBHag/H0g0kP3R7QAAOS4zCFP6LNsh1C8uja4exlV/Zqe/BPxcI1cDgJXRZK4hpwwYYbZ4Zh1Se+f47DGZLCXkq/vhKEYuG7FBupZHrB/l0ljVRr4yPxIm7BLDEyzxPlZu2oIJy1X+CEU6krX8hl7QkNu3BhwLn8CLzaHyD8mJ/Wsao8kck2WK6+Pt8WTM8BE9H6JZfR6sIHhU1nQQRocByy6N9XpBC0s0C6VwHU91PxJCDXe+PVrlXcjwxbqRax5w9dn5Kck8Xu5rZHlI10pL7ty3yGM755RlKC3PXgLWM4NXAOSNKxKRZCAypCCc1wkmaYVjM/5L8BLRXK1DByHQAzipDxDQlkrS8z+sPz2R4wD/KmSCD4vRq11tTnT/cfE7UaDUnqYa8pVpxyfEfaGXVH9zM4BI319y9EvlqvUPnlhbDwl31EcOlWyiYFud15/+fgmalHGCob1cycZ2uEe93d2irjFIEsqABq6r+n3DGBljhrk5alZemP6YILCfwaArdDSvPKkQmPt6Ob2Y52XBzeEdqQK3NoTuMPEwNYo3Tl+iUQj2QbgvocX/GnJZHKOsi3skRU3LpPkXuCzlT7APIH4gGgXxYuM',
            '__ASYNCPOST': 'true',
            'ctl00$cph$btnDepCal': 'Search'
        })
    });
    const body = yield response.text();
    const $ = cheerio.load(body);
    // console.log(body);
    const $selected = $("label.radio");
    // console.log("Seats for the date: ");
    const tripData = [];
    $selected.each((i, elem) => {
        console.log("elem: " + $(elem).text());
        tripData.push($(elem).text());
    });
    console.log("C2C Data: " + tripData);
    // timeSeatString format XX:XX AM, XX Seats
    return tripData.map((timeSeatString) => ({
        "numSeats": Number(timeSeatString.split(", ")[1].split(" Seats")[0]),
        "startTime": date.toISOString().slice(0, 10) + "T" + (0, helper_utils_1.time12to24)(timeSeatString.split(", ")[0]),
        "endTime": date.toISOString().slice(0, 10) + "T" + (0, helper_utils_1.time12to24Add5)(timeSeatString.split(", ")[0]),
        "price": 90,
        "busCompanyId": "C2C",
        "origin": (0, helper_utils_1.stringifyC2CLocation)(pickup),
        "destination": (0, helper_utils_1.stringifyC2CLocation)(dropoff),
    }));
});
exports.scrapeC2C = scrapeC2C;
const scrapeOurBus = (pickup, dropoff, date) => __awaiter(void 0, void 0, void 0, function* () {
    const dateString = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(date);
    const url = `https://www.ourbus.com/booknow?origin=${pickup}&destination=${dropoff}&departure_date=${dateString}&adult=1`;
    const response = yield fetch(url);
    const body = yield response.text();
    // console.log(body);
    var defaultSearchString = body.substring(body.indexOf("{", body.indexOf("var defaultSearch = '") + 1), body.indexOf("';", body.indexOf("var defaultSearch = '") + 1));
    // console.log(defaultSearchString);
    // console.log();
    const defaultSearch = JSON.parse(defaultSearchString);
    // console.log(defaultSearch);
    const tripData = defaultSearch.searchedRouteList.list;
    console.log("OurBus Data: " + tripData);
    if (tripData === undefined) {
        return [];
    }
    return tripData.map(({ available_seat, src_stop_name, dest_stop_name, src_landmark, dest_landmark, travel_date, src_stop_eta, dest_stop_eta, pass_amount, booking_fee, facility_fee }) => {
        return {
            "numSeats": Number(available_seat),
            "startTime": String(travel_date + "T" + src_stop_eta),
            "endTime": String(travel_date + "T" + dest_stop_eta),
            "price": Number(pass_amount + booking_fee + facility_fee),
            "busCompanyId": "OurBus",
            "origin": String(src_stop_name),
            "destination": String(dest_stop_name),
        };
    });
});
exports.scrapeOurBus = scrapeOurBus;
const scrapeMegabus = (pickup, dropoff, date) => __awaiter(void 0, void 0, void 0, function* () {
    const dateString = new Intl.DateTimeFormat("fr-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(date);
    const url = `https://us.megabus.com/journey-planner/api/journeys?originId=${pickup}&destinationId=${dropoff}&departureDate=${dateString}&totalPassengers=1&concessionCount=0&nusCount=0&otherDisabilityCount=0&wheelchairSeated=0&pcaCount=0&days=1`;
    const response = yield fetch(url);
    const data = yield response.json();
    const journeys = data.journeys;
    if (journeys === undefined) {
        return [];
    }
    return journeys.map(({ departureDateTime, arrivalDateTime, price, origin, destination }) => ({
        "numSeats": -1,
        "startTime": departureDateTime,
        "endTime": arrivalDateTime,
        "price": price,
        "busCompanyId": "Megabus",
        "origin": origin.cityName,
        "destination": destination.cityName,
    }));
});
exports.scrapeMegabus = scrapeMegabus;
const scrapeFlixbus = (pickup, dropoff, date) => __awaiter(void 0, void 0, void 0, function* () {
    const dateString = new Intl.DateTimeFormat("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(date);
    const url = `https://global.api.flixbus.com/search/service/v4/search?from_city_id=${pickup}&to_city_id=${dropoff}&departure_date=${dateString}&products=%7B%22adult%22%3A1%7D&currency=USD&locale=en_US&search_by=cities&include_after_midnight_rides=1`;
    const response = yield fetch(url);
    const data = yield response.json();
    const cities = data.cities;
    const fee = Number(data.global_platform_fees[0].fee_amount) || 0;
    const results = Object.values(data.trips[0].results);
    if (results === undefined || cities === undefined) {
        return [];
    }
    return results.map(({ departure, arrival, price, available }) => {
        const total = Number((price.total + fee).toFixed(2));
        return {
            "numSeats": available.seats,
            "startTime": departure.date.substring(0, 19),
            "endTime": arrival.date.substring(0, 19),
            "price": total,
            "busCompanyId": "Flixbus",
            "origin": cities[pickup].name,
            "destination": cities[dropoff].name,
        };
    });
});
exports.scrapeFlixbus = scrapeFlixbus;
//# sourceMappingURL=scraping.service.js.map