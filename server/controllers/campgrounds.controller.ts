'use strict';
import Campground from '../models/campgrounds.model';
import { Request, Response } from "express";


const getAllCampgrounds = async (req: Request, res: Response) => {
  try {
    const campgrounds = await Campground.find({});
    console.log('All good from controller - getCamprounds');
    res.status(200);
    res.send(campgrounds);
  } catch (err) {
    console.log('Error from controller - getCamprounds');
    res.status(400);
  }
};

const getCampgroundById = async (req: Request, res: Response) => {
  try {
    const campgroundById = await Campground.findById(req.params._id);
    console.log('All good from controller - getOneCampground');
    res.status(200);
    res.send(campgroundById);
  } catch (err) {
    console.log('Error from controller - getOneCampground');
    res.status(400);
  }
};
const postCampground = async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    await Campground.create(req.body);
    console.log('All good from controller - postCampround');
    res.status(201);
    res.send(req.body);
  } catch (err) {
    console.log(err, 'Error from controller - postCampround');
    res.status(400).send('sorry')
  }
};
const removeCampground = async (req: Request, res: Response) => {
  try {
    await Campground.findByIdAndDelete(req.params._id);
    console.log('All good from controller - removeCampground');
    res.status(200);
    res.send('Successfully deleted');
  } catch (err) {
    console.log('Error from controller - removeCampground');
    res.status(400);
  }
};

export default  { getAllCampgrounds, getCampgroundById, postCampground, removeCampground };