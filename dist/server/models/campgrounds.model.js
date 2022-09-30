"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const index_1 = __importDefault(require("./index"));
const campgroundSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    location: {
        //correct order: long, lat
        // type: String, required: true,
        longitude: { type: String, required: true },
        latitude: { type: String, required: true }
    },
    description: { type: String, required: true },
    image: { type: String, required: false }
});
const Campground = index_1.default.model('campgrounds', campgroundSchema);
exports.default = Campground;
