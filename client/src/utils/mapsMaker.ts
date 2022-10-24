import { Map } from 'mapbox-gl';
import { ForwardedRef, RefObject } from 'react';
import {
  initializeMap,
  addSearchBar,
  addUserLocationControl,
  addSwitcherControl,
  addZoomAndRotationControl,
  addScale,
} from './mapboxFunctions';
import { Location } from '../customTypes';
export const createMainMap = (
  map: React.MutableRefObject<Map | null>,
  mapContainer: React.MutableRefObject<HTMLElement | null>,
  currentLocation: Location
) => {
  map.current = initializeMap(mapContainer, currentLocation);
  // Add SearchBar
  document
    .getElementById('geocoder')!
    .appendChild(addSearchBar().onAdd(map.current));

  addSwitcherControl(map.current);
  addZoomAndRotationControl(map.current);
  addScale(map.current);
  addUserLocationControl(map.current);
  return map.current;
};

export const createInputMap = (
  map: React.MutableRefObject<Map | null>,
  mapContainer: React.MutableRefObject<HTMLElement | null>,
  currentLocation: Location
) => {
  map.current = initializeMap(mapContainer, currentLocation);

  const searchBar = addSearchBar(map.current);
  const userLocation = addUserLocationControl(map.current);

  addSwitcherControl(map.current);
  addZoomAndRotationControl(map.current);
  return { searchBar, userLocation };
};

