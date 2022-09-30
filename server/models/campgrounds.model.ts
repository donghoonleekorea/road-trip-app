import { Schema, model  } from 'mongoose';

export interface ILocation {
  longitude: string;
  latitude: string;
}

export interface ICampground {
  name: string;
  location: ILocation;
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

const Campground = model<ICampground>('Campgrounds', campgroundSchema);

export default Campground;

