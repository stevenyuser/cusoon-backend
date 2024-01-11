"use strict";
// date format // yyyy-MM-dd`T`HH:mm:ss - 2023-11-23T01:30:20
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralLocations = exports.FlixbusLocations = exports.MegabusLocations = exports.OurBusLocations = exports.C2CLocations = exports.BusCompanyIdEnum = exports.BusCompanyEnum = void 0;
var BusCompanyEnum;
(function (BusCompanyEnum) {
    BusCompanyEnum["C2C"] = "Cornell C2C";
    BusCompanyEnum["OurBus"] = "OurBus";
    BusCompanyEnum["Flixbus"] = "Flixbus";
    BusCompanyEnum["Megabus"] = "Megabus";
})(BusCompanyEnum || (exports.BusCompanyEnum = BusCompanyEnum = {}));
var BusCompanyIdEnum;
(function (BusCompanyIdEnum) {
    BusCompanyIdEnum["C2C"] = "C2C";
    BusCompanyIdEnum["OurBus"] = "OurBus";
    BusCompanyIdEnum["Flixbus"] = "Flixbus";
    BusCompanyIdEnum["Megabus"] = "Megabus";
})(BusCompanyIdEnum || (exports.BusCompanyIdEnum = BusCompanyIdEnum = {}));
var C2CLocations;
(function (C2CLocations) {
    C2CLocations["IthacaNorthCampus"] = "7,16";
    C2CLocations["IthacaSageHall"] = "7,17";
    C2CLocations["IthacaBusShelter"] = "7,38";
    C2CLocations["NYCWeillCornell"] = "8,20";
    C2CLocations["NYCFTrain"] = "8,39";
    C2CLocations["NYCCornellClub"] = "8,19"; // New York City, Cornell Club
})(C2CLocations || (exports.C2CLocations = C2CLocations = {}));
var OurBusLocations;
(function (OurBusLocations) {
    OurBusLocations["Ithaca"] = "Ithaca,%20NY";
    OurBusLocations["NYC"] = "New%20York,%20NY";
    OurBusLocations["FortLee"] = "Fort%20Lee,%20NJ"; // Fort Lee, NJ
})(OurBusLocations || (exports.OurBusLocations = OurBusLocations = {}));
var MegabusLocations;
(function (MegabusLocations) {
    MegabusLocations["Ithaca"] = "511";
    MegabusLocations["NYC"] = "123";
})(MegabusLocations || (exports.MegabusLocations = MegabusLocations = {}));
var FlixbusLocations;
(function (FlixbusLocations) {
    FlixbusLocations["Ithaca"] = "99c4f86c-3ecb-11ea-8017-02437075395e";
    FlixbusLocations["NYC"] = "c0a47c54-53ea-46dc-984b-b764fc0b2fa9";
})(FlixbusLocations || (exports.FlixbusLocations = FlixbusLocations = {}));
var GeneralLocations;
(function (GeneralLocations) {
    GeneralLocations["NYC"] = "NYC";
    GeneralLocations["Ithaca"] = "Ithaca";
})(GeneralLocations || (exports.GeneralLocations = GeneralLocations = {}));
//# sourceMappingURL=types.js.map