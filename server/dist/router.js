"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const campgrounds_controller_1 = __importDefault(require("./controllers/campgrounds.controller"));
const router = (0, express_1.default)();
router.get('/campgrounds', (campgrounds_controller_1.default.getAllCampgrounds));
router.post('/campgrounds', (campgrounds_controller_1.default.postCampground));
router.delete('/campgrounds/:_id', (campgrounds_controller_1.default.removeCampground));
router.get('/campgrounds/:_id', (campgrounds_controller_1.default.getCampgroundById));
exports.default = router;
//# sourceMappingURL=router.js.map