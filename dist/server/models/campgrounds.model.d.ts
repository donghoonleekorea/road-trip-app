import mongoose from './index';
export interface ICampground {
    name: string;
    location: {
        lon: number;
        lat: number;
    };
    description: string;
    image: string;
}
declare const Campground: mongoose.Model<ICampground, {}, {}, {}, any>;
export default Campground;
//# sourceMappingURL=campgrounds.model.d.ts.map