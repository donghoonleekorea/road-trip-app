import mapboxgl from 'mapbox-gl';
import 'mapbox-gl-style-switcher/styles.css';
import { MapboxStyleSwitcherControl } from 'mapbox-gl-style-switcher';
import { switcherStyles } from './switcherStyles';
import { initializeMap, mapSearchBar, locationControl } from './helperFuncs';

export const createMainMap = (map, mapContainer, currentLocation) => {
  map.current = initializeMap(mapContainer, currentLocation);
  // Add SearchBar
  document
    .getElementById('geocoder')
    .appendChild(mapSearchBar().onAdd(map.current));
  // add style switcher
  map.current.addControl(new MapboxStyleSwitcherControl(switcherStyles));
  // add zoom and rotation controls to the map.
  map.current.addControl(new mapboxgl.NavigationControl());
  // add scale
  const scale = new mapboxgl.ScaleControl({
    maxWidth: 200,
    unit: 'metric',
  });
  map.current.addControl(scale);
  // current location control
  map.current.addControl(locationControl());
  return map.current;
};

export const createInputMap = (map, mapContainer, currentLocation) => {
  map.current = initializeMap(mapContainer, currentLocation);
  map.current.addControl(mapSearchBar());
  // go to user's location control
  map.current.addControl(locationControl());
  //   // add style switcher
  map.current.addControl(new MapboxStyleSwitcherControl(switcherStyles));
  //   // add zoom and rotation controls to the map.
  map.current.addControl(new mapboxgl.NavigationControl());
  return map.current;
};

