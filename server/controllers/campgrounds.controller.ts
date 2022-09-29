'use strict';
const campground = require('../models/campgrounds.model');
import { Response } from "express";


export default async function getAllCampgrounds (_: any, res: Response) {
  try {
    const campgrounds = await campground.find({});
    console.log('All good from controller - getCamprounds');
    res.status(200);
    res.send(campgrounds);
  } catch (err) {
    console.log('Error from controller - getCamprounds');
    res.status(400);
  }
};
// export getCampgroundById = async (req, res) => {
//   try {
//     const campgroundById = await campground.findById(req.params._id);
//     console.log('All good from controller - getOneCampground');
//     res.status(200);
//     res.send(campgroundById);
//   } catch (err) {
//     console.log('Error from controller - getOneCampground');
//     res.status(400);
//   }
// };
// export postCampground = async (req, res) => {
//   try {
//     await campground.create(req.body);
//     console.log('All good from controller - postCampround');
//     res.status(201);
//     res.send(req.body);
//   } catch (err) {
//     console.log('Error from controller - postCampround');
//     res.status(400);
//   }
// };
// export removeCampground = async (req, res) => {
//   try {
//     await campground.findByIdAndDelete(req.params._id);
//     console.log('All good from controller - removeCampground');
//     res.status(200);
//     res.send('Successfully deleted');
//   } catch (err) {
//     console.log('Error from controller - removeCampground');
//     res.status(400);
//   }
// };
