const campground = require('../models/campgrounds.model');

exports.getAllCampgrounds = async (req, res) => {
  try {
    console.log('All good from controller - getCamprounds');
    const campgrounds = await campground.find({});
    res.status(200);
    res.send(campgrounds);
  } catch (err) {
    console.log('Error from controller - getCamprounds');
    res.status(400);
  }
}

exports.getCampgroundById = async (req, res) => {
  try {
    console.log('All good from controller - getOneCampground');
    const campgroundById = await campground.findById(req.params._id);
    res.status(200);
    res.send(campgroundById);
  } catch (err) {
    console.log('Error from controller - getOneCampground');
    res.status(400);
  }
}

exports.postCampground = async (req, res) => {
  try {
    console.log('All good from controller - postCampround');
    campground.create(req.body);
    res.status(201);
    res.send(req.body);
  } catch (err) {
    console.log('Error from controller - postCampround');
    res.status(400);
  }
}

exports.removeCampground = async (req, res) => {
  try {
    console.log('All good from controller - removeCampground');
    await campground.findByIdAndDelete(req.params._id);
    res.status(200);
    res.send('Successfully deleted');
  } catch (err) {
    console.log('Error from controller - removeCampground');
    res.status(400);
  }
}
