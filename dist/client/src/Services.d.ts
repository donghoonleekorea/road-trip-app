import { LngLat } from "mapbox-gl";
export interface Campground {
    name: string;
    description: string;
    location: LngLat;
    image: string;
    _id?: string;
}
export declare const addNewCampground: (campground: Campground) => Promise<Campground | string>;
export declare const getAllCamprounds: () => Promise<Campground[] | string>;
export declare const getCampgroundById: (id: string) => Promise<Campground | string>;
//# sourceMappingURL=Services.d.ts.map