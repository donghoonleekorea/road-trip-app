import './LocationInput.styles.css';
import React, { useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
// import { GeolocateControl } from "react-map-gl";

mapboxgl.accessToken = 'pk.eyJ1IjoiYWZlcnJhcmlmaXJtbyIsImEiOiJjaXVyYzlqYXYwMDBqMnptczczdjFsZ2RxIn0.zUalw0sjfenPlLL_HCMpTw';

const LocationInput = () => {

  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      // center: [lng, lat],
      // zoom: zoom
      center: [1.94, 43.94],
      zoom: 7,
    });
  });

  useEffect(() => {
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
      }))
      new mapboxgl.NavigationControl();
    });

  return (
    <div className='set-location-map-container'>
      <div ref={mapContainer} className='add-location-map' />
    </div>
  )
}

export default LocationInput;