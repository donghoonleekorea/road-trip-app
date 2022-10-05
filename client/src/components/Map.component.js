import React, { useRef, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import { getAllCampgrounds } from '../utils/ApiServices';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { createMainMap } from '../utils/maps';
import { createMarkers } from '../utils/markers';

function Map({ currentLocation, addNew }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [campgrounds, setCampgrounds] = useState([]);

  const getCamps = async () => {
    const camps = await getAllCampgrounds();
    setCampgrounds(camps);
  };

  useEffect(() => {
    getCamps();
  }, [addNew]); // gets campgrounds when a new campground is added

  useEffect(() => {
    if (map.current || !currentLocation.length) return;
    createMainMap(map, mapContainer, currentLocation);
  }, [campgrounds, currentLocation]);

  useEffect(() => {
    // creates and renders a marker for each campground
    currentLocation.length && createMarkers(campgrounds, map);
  }, [campgrounds, currentLocation]);

  return (
    <main className='main-container'>
      <div
        id='geocoder'
        className='geocoder'
      ></div>
      {mapContainer && (
        <div
          ref={mapContainer}
          className='map-container'
        />
      )}
    </main>
  );
}

export default Map;

