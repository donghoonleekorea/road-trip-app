"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const { Schema } = index_1.default;
const campgroundSchema = new Schema({
    name: { type: String, required: true },
    location: {
        lon: { type: Number, required: true },
        lat: { type: Number, required: true }
    },
    description: { type: String, required: true },
    image: { type: String, required: false }
});
const Campground = index_1.default.model('campgrounds', campgroundSchema);
exports.default = Campground;
//# sourceMappingURL=campgrounds.model.js.map