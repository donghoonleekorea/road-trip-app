import { LngLatLike } from "mapbox-gl";

export type Location = { lon: number | string, lat: number | string };

export interface Campground {
  name: string;
  description: string;
  location: Location;
  image: string;
  _id?: string;
}
