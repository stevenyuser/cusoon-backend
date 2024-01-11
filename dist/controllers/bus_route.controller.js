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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBusRoutes = void 0;
const types_1 = require("../types");
const scraping_service_1 = require("../services/scraping.service");
const getBusRoutes = (origin, destination, date) => __awaiter(void 0, void 0, void 0, function* () {
    let ourbusData, c2cData, megabusData, flixbusData;
    if (origin === types_1.GeneralLocations.Ithaca && destination === types_1.GeneralLocations.NYC) { // ITH -> NYC
        let [ourbusDataFortLee, ourbusDataNYC] = yield Promise.all([
            (0, scraping_service_1.scrapeOurBus)(types_1.OurBusLocations.Ithaca, types_1.OurBusLocations.FortLee, date),
            (0, scraping_service_1.scrapeOurBus)(types_1.OurBusLocations.Ithaca, types_1.OurBusLocations.NYC, date)
        ]);
        ourbusData = ourbusDataFortLee.concat(ourbusDataNYC);
        c2cData = yield (0, scraping_service_1.scrapeC2C)(types_1.C2CLocations.IthacaNorthCampus, types_1.C2CLocations.NYCCornellClub, date);
        megabusData = yield (0, scraping_service_1.scrapeMegabus)(types_1.MegabusLocations.Ithaca, types_1.MegabusLocations.NYC, date);
        flixbusData = yield (0, scraping_service_1.scrapeFlixbus)(types_1.FlixbusLocations.Ithaca, types_1.FlixbusLocations.NYC, date);
    }
    else { // NYC -> ITH
        let [ourbusDataFortLee, ourbusDataNYC] = yield Promise.all([
            (0, scraping_service_1.scrapeOurBus)(types_1.OurBusLocations.FortLee, types_1.OurBusLocations.Ithaca, date),
            (0, scraping_service_1.scrapeOurBus)(types_1.OurBusLocations.NYC, types_1.OurBusLocations.Ithaca, date)
        ]);
        ourbusData = ourbusDataFortLee.concat(ourbusDataNYC);
        c2cData = yield (0, scraping_service_1.scrapeC2C)(types_1.C2CLocations.NYCCornellClub, types_1.C2CLocations.IthacaNorthCampus, date);
        megabusData = yield (0, scraping_service_1.scrapeMegabus)(types_1.MegabusLocations.NYC, types_1.MegabusLocations.Ithaca, date);
        flixbusData = yield (0, scraping_service_1.scrapeFlixbus)(types_1.FlixbusLocations.NYC, types_1.FlixbusLocations.Ithaca, date);
    }
    const busRoutes = ourbusData.concat(c2cData).concat(megabusData).concat(flixbusData);
    if (busRoutes === undefined) {
        return [];
    }
    return busRoutes;
});
exports.getBusRoutes = getBusRoutes;
//# sourceMappingURL=bus_route.controller.js.map