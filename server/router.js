"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const campgrounds_controller_1 = require("./controllers/campgrounds.controller");
router.get('/campgrounds', campgrounds_controller_1.getAllCampgrounds);
router.post('/campgrounds', campgrounds_controller_1.postCampground);
router.delete('/campgrounds/:_id', campgrounds_controller_1.removeCampground);
router.get('/campgrounds/:_id', campgrounds_controller_1.getCampgroundById);
exports.default = router;
