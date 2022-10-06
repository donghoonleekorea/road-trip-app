import './LocationInput.styles.css';
import React, { useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import 'mapbox-gl-style-switcher/styles.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { createInputMap } from '../utils/mapsMaker';
import { draggableMarker } from '../utils/mapboxFunctions';
import 'mapbox-gl-style-switcher/styles.css';
import { Location } from '../customTypes';
import { Map } from 'mapbox-gl';

type Props = {
  currentLocation: Location;
  setCoordinates: React.Dispatch<React.SetStateAction<number[]>>;
};
const LocationInput = ({ currentLocation, setCoordinates }: Props) => {
  const mapContainer = useRef(null);
  const map = useRef<Map | null>(null);

  useEffect(() => {
    // Create the input map, and obtain the searchBar, and userLocation to use later
    const { searchBar, userLocation } = createInputMap(
      map,
      mapContainer,
      currentLocation
    );

    searchBar.on('result', (e) => {
      marker.setLngLat(e.result.center);
    });

    userLocation.on('geolocate', (e: any) => {
      setTimeout(() => {
        marker.setLngLat([e.coords.longitude, e.coords.latitude]);
      }, 1500);
    });

    // define properties of draggable marker
    let pin = document.createElement('div');
    pin.className = 'marker';

    // create a draggable marker on the map
    const marker = draggableMarker(
      currentLocation.lon as number,
      currentLocation.lat as number,
      pin,
      map.current as Map
    );
    // get the coordinates from the position where the pin was dragged to
    const getCoordinates = () => {
      const coordinates = marker.getLngLat();
      setCoordinates([coordinates.lng, coordinates.lat]);
      console.log([coordinates.lng, coordinates.lat]);
    };

    marker.on('dragend', getCoordinates);
  }, [setCoordinates]);

  return (
    <div
      data-testid='map-container'
      className='set-location-map-container'
    >
      <div
        ref={mapContainer}
        className='add-location-map'
      ></div>
    </div>
  );
};

export default LocationInput;

