import React, { useRef, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import { getAllCampgrounds } from '../utils/ApiServices';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { createMainMap } from '../utils/mapsMaker';
import { createMarkersForCampgrounds } from '../utils/markersMaker';
import { Location, Campground } from '../customTypes';
import { Map } from 'mapbox-gl';

type Props = {
  currentLocation: Location | null;
  addNew: boolean;
};

// Changed name of component to Maps, since Map is a type of mapBox
function Maps({ currentLocation, addNew }: Props) {
  const mapContainer: React.MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const map = useRef<Map>(null);

  const [campgrounds, setCampgrounds] = useState<Campground[]>([]);

  const getCamps = async () => {
    const camps = await getAllCampgrounds();
    setCampgrounds(camps!);
  };

  useEffect(() => {
    getCamps();
  }, [addNew]); // gets campgrounds when a new campground is added

  useEffect(() => {
    if (map.current || currentLocation === null) return;
    createMainMap(map, mapContainer, currentLocation);
  }, [campgrounds, currentLocation]);

  useEffect(() => {
    // creates and renders a marker for each campground
    currentLocation !== null &&
      createMarkersForCampgrounds(campgrounds, map.current!);
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

export default Maps;

