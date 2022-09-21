const { Schema, model } = require('./index');

const campgroundSchema = new Schema ({
  name: {type: String, required: true},
  location: {
    latitude: { type: String, required: true },
    longitude: { type: String, required: true }
  },
  description: {type: String, required: true},
  images: {type: [String], required: false}
});

const Campground = model('campgrounds', campgroundSchema);

module.exports = Campground;