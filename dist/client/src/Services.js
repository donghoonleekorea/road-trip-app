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
exports.getCampgroundById = exports.getAllCamprounds = exports.addNewCampground = void 0;
const addNewCampground = (campground) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(process.env.REACT_APP_DB_URL + 'campgrounds/', {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(campground),
        });
        return yield response.json();
    }
    catch (error) {
        console.log('Error from addNewCampround in Services');
        return String(alert('Unable to add Campground'));
    }
});
exports.addNewCampground = addNewCampground;
const getAllCamprounds = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Fetching camprounds from DB');
        const response = yield fetch(process.env.REACT_APP_DB_URL + 'campgrounds/');
        return yield response.json();
    }
    catch (err) {
        console.log('Error from getAllCampgrounds in Services');
        return String(alert('Unable to get Campgrounds'));
    }
});
exports.getAllCamprounds = getAllCamprounds;
const getCampgroundById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(process.env.REACT_APP_DB_URL + 'campgrounds/' + id);
        return response.json();
    }
    catch (err) {
        console.log('Error from getCampgroundById in Services');
        return String(alert('Unable to get Campground'));
    }
});
exports.getCampgroundById = getCampgroundById;
