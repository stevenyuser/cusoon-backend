"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyC2CLocation = exports.time12to24Add5 = exports.time12to24 = void 0;
const types_1 = require("../types");
const time12to24 = (timeString) => {
    const isPM = timeString.includes("PM");
    let hourString = timeString.split(":")[0];
    let minuteString = timeString.split(":")[1].substring(0, 2);
    if (isPM) {
        hourString = String(12 + Number(hourString));
    }
    if (hourString.length == 1) {
        hourString = "0" + hourString;
    }
    return hourString + ":" + minuteString + ":" + "00";
};
exports.time12to24 = time12to24;
const time12to24Add5 = (timeString) => {
    const isPM = timeString.includes("PM");
    let hourString = timeString.split(":")[0];
    let minuteString = timeString.split(":")[1].substring(0, 2);
    hourString = String(5 + Number(hourString));
    if (isPM) {
        hourString = String(12 + Number(hourString));
    }
    if (hourString.length == 1) {
        hourString = "0" + hourString;
    }
    return hourString + ":" + minuteString + ":" + "00";
};
exports.time12to24Add5 = time12to24Add5;
const stringifyC2CLocation = (location) => {
    switch (location) {
        case types_1.C2CLocations.IthacaNorthCampus:
            return "Ithaca, North Campus";
        case types_1.C2CLocations.IthacaSageHall:
            return "Ithaca, Sage Hall";
        case types_1.C2CLocations.IthacaBusShelter:
            return "Ithaca, Southeast B Lot Bus Shelter";
        case types_1.C2CLocations.NYCWeillCornell:
            return "New York City, Weill Cornell Medical College";
        case types_1.C2CLocations.NYCFTrain:
            return "New York City, F-Train to Tech Campus (3rd Ave & 64th St)";
        case types_1.C2CLocations.NYCCornellClub:
            return "NYC, Cornell Club";
    }
};
exports.stringifyC2CLocation = stringifyC2CLocation;
//# sourceMappingURL=helper.utils.js.map