import './LocationInput.styles.css';
import React, { useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import 'mapbox-gl-style-switcher/styles.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { createInputMap } from '../utils/maps';
import { draggableMarker } from '../utils/helperFuncs';
import { initializeMap, mapSearchBar, locationControl } from '../utils/helperFuncs';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl-style-switcher/styles.css';
import { MapboxStyleSwitcherControl } from 'mapbox-gl-style-switcher';
import { switcherStyles } from '../utils/switcherStyles';


const LocationInput = ({ currentLocation, setCoordinates }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  // const [searchb, setGeocoder]

   
  useEffect(() => {
    map.current = initializeMap(mapContainer, currentLocation);

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
    });
    map.current.addControl(geocoder);
    // go to user's location control
    const userLocation = locationControl()
    map.current.addControl(userLocation);
    //   // add style switcher
    map.current.addControl(new MapboxStyleSwitcherControl(switcherStyles));
    //   // add zoom and rotation controls to the map.
    map.current.addControl(new mapboxgl.NavigationControl());
   
    // console.log('this is geocoder.current', geocoder);
    geocoder.on('result', (e) => {
      marker.setLngLat(e.result.center);
    })

    userLocation.on('geolocate', (e) => {
      console.log('hellooo', e);
      setTimeout(marker.setLngLat([e.coords.longitude, e.coords.latitude], 5))
    })
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
    <div data-testid='map-container' className='set-location-map-container'>
      <div
        ref={mapContainer}
        className='add-location-map'
      ></div>
    </div>
  );
};

export default LocationInput;









