import mongoose from './index';

const {Schema} = mongoose;

const campgroundSchema = new Schema ({
  name: {type: String, required: true},
  location: {
    lon: { type: Number, required: true },
    lat: { type: Number, required: true }
  },
  description: {type: String, required: true},
  image: {type: String, required: false}
});

const Campground = mongoose.model('campgrounds', campgroundSchema);

export default Campground;