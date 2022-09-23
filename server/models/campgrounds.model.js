const { Schema, model } = require('./index');

const campgroundSchema = new Schema ({
  name: {type: String, required: true},
  location: {
    type: String, required: true,
    // latitude: { type: String, required: true },
    // longitude: { type: String, required: true }
  },
  description: {type: String, required: true},
  image: {type: String, required: false}
});

const Campground = model('campgrounds', campgroundSchema);

module.exports = Campground;