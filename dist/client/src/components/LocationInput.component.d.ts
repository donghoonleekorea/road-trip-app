import './LocationInput.styles.css';
import React from 'react';
import { LngLat } from 'mapbox-gl';
import 'mapbox-gl-style-switcher/styles.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
declare type Props = {
    currentLocation: LngLat;
    setCoordinates: React.Dispatch<React.SetStateAction<LngLat>>;
};
declare const LocationInput: ({ currentLocation, setCoordinates }: Props) => JSX.Element;
export default LocationInput;
//# sourceMappingURL=LocationInput.component.d.ts.map