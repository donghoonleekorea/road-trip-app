import { LngLat } from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl-style-switcher/styles.css';
declare type Props = {
    currentLocation: LngLat;
    addNew: boolean;
};
declare function Maps({ currentLocation, addNew }: Props): JSX.Element;
export default Maps;
//# sourceMappingURL=Map.component.d.ts.map