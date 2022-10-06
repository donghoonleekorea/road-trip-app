import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl-style-switcher/styles.css';
import { MapboxStyleSwitcherControl } from 'mapbox-gl-style-switcher';
import { switcherStyles } from './switcherStyles';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

//1. Map Functions
//2. Marker Functions

//1. Map Functions
export const initializeMap = (mapContainer, currentLocation) => {
  return new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/aferrarifirmo/cl8hbvmi3001415o9hxsj0b3l',
    center: currentLocation,
    zoom: 4,
  });
};

export const addSearchBar = (map) => {
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: false,
  });
  map && map.addControl(geocoder);
  return geocoder;
};

export const addSwitcherControl = (map) => {
  return map.addControl(new MapboxStyleSwitcherControl(switcherStyles));
};

export const addZoomAndRotationControl = (map) => {
  return map.addControl(new mapboxgl.NavigationControl());
};
export const addUserLocationControl = (map) => {
  const userLocationControl = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true,
  });
  map.addControl(userLocationControl);
  return userLocationControl;
};

export const addScale = (map) => {
  const scale = new mapboxgl.ScaleControl({
    maxWidth: 200,
    unit: 'metric',
  });
  map.addControl(scale);
  return scale;
};

// 2. Marker Functions
export const draggableMarker = (lon, lat, pin, map) => {
  return new mapboxgl.Marker(pin, { draggable: true })
    .setLngLat([lon, lat])
    .setOffset([0, -20])
    .addTo(map);
};

export const nonDraggableMarker = (lon, lat, pin, map) => {
  return new mapboxgl.Marker(pin, { offset: [0, -20] })
    .setLngLat([lon, lat])
    .addTo(map);
};

export const renderPopUp = ({ image, name, description, location }, map) => {
  return new mapboxgl.Popup({ offset: 30 }) // add popups
    .setLngLat([location.longitude, location.latitude])
    .setHTML(
      `
              <img src="${image}">
              <h3>${name}</h3>
              <p>${description}</p>
              `
    )
    .addTo(map);
};

