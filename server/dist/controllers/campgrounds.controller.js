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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const campgrounds_model_1 = __importDefault(require("../models/campgrounds.model"));
const getAllCampgrounds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const campgrounds = yield campgrounds_model_1.default.find({});
        console.log('All good from controller - getCamprounds');
        res.status(200);
        res.send(campgrounds);
    }
    catch (err) {
        console.log('Error from controller - getCamprounds');
        res.status(400);
    }
});
const getCampgroundById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const campgroundById = yield campgrounds_model_1.default.findById(req.params._id);
        console.log('All good from controller - getOneCampground');
        res.status(200);
        res.send(campgroundById);
    }
    catch (err) {
        console.log('Error from controller - getOneCampground');
        res.status(400);
    }
});
const postCampground = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        yield campgrounds_model_1.default.create(req.body);
        console.log('All good from controller - postCampround');
        res.status(201);
        res.send(req.body);
    }
    catch (err) {
        console.log('this is req.body', req.body);
        console.log('Error from controller - postCampround', err);
        res.status(400);
    }
});
const removeCampground = (req, rereq, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield campgrounds_model_1.default.findByIdAndDelete(req.params._id);
        console.log('All good from controller - removeCampground');
        res.status(200);
        res.send('Successfully deleted');
    }
    catch (err) {
        console.log('Error from controller - removeCampground');
        res.status(400);
    }
});
exports.default = { getAllCampgrounds, getCampgroundById, postCampground, removeCampground };
//# sourceMappingURL=campgrounds.controller.js.map