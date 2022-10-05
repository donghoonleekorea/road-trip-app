import './LocationInput.styles.css';
import React, { useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import 'mapbox-gl-style-switcher/styles.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { createInputMap } from '../utils/maps';
import { draggableMarker } from '../utils/helperFuncs';

const LocationInput = ({ currentLocation, setCoordinates }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    createInputMap(map, mapContainer, currentLocation);

    // define properties of draggable marker
    let pin = document.createElement('div');
    pin.className = 'marker';

    // create a draggable marker on the map
    const marker = draggableMarker(
      currentLocation[0],
      currentLocation[1],
      pin,
      map.current
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
    <div className='set-location-map-container'>
      <div
        ref={mapContainer}
        className='add-location-map'
      ></div>
    </div>
  );
};

export default LocationInput;

