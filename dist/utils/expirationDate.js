"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hour = 3600000;
const min = 3600000 / 60;
const sec = 3600000 / 60 / 60;
exports.default = (afterNHours) => {
    return new Date(Date.now() + afterNHours * hour);
};
