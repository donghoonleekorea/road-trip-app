import { Schema, model  } from 'mongoose';
import mongoose from './index';
// export interface ILocation {
//   longitude: string;
//   latitude: string;
// }

export interface ICampground {
  name: string;
  location: {
    longitude: string,
    latitude: string,
  },
  description: string;
  image: string;
}

const campgroundSchema = new Schema ({
  name: {type: String, required: true},
  location: {
    //correct order: long, lat
    // type: String, required: true,
    longitude: { type: String, required: true },
    latitude: { type: String, required: true }
  },
  description: {type: String, required: true},
  image: {type: String, required: false}
});

const Campground = mongoose.model<ICampground>('campgrounds', campgroundSchema);

export default Campground;

