import mapboxgl, { LngLatLike, Map } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl-style-switcher/styles.css';
import { MapboxStyleSwitcherControl } from 'mapbox-gl-style-switcher';
import { switcherStyles } from './switcherStyles';
import { Campground, Location } from '../customTypes';
import React from 'react';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN as string;

//1. Map Functions
//2. Marker Functions

//1. Map Functions
export const initializeMap = (
  mapContainer: React.MutableRefObject<HTMLElement | null>,
  currentLocation: Location
) => {
  return new mapboxgl.Map({
    container: mapContainer.current!,
    style: 'mapbox://styles/aferrarifirmo/cl8hbvmi3001415o9hxsj0b3l',
    center: currentLocation as LngLatLike,
    zoom: 4,
  });
};

export const addSearchBar = (map: Map | void) => {
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: false,
  });
  map && map.addControl(geocoder);
  return geocoder;
};

export const addSwitcherControl = (map: Map) => {
  return map.addControl(new MapboxStyleSwitcherControl(switcherStyles));
};

export const addZoomAndRotationControl = (map: Map) => {
  return map.addControl(new mapboxgl.NavigationControl());
};
export const addUserLocationControl = (map: Map) => {
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

export const addScale = (map: Map) => {
  const scale = new mapboxgl.ScaleControl({
    maxWidth: 200,
    unit: 'metric',
  });
  map.addControl(scale);
  return scale;
};

// 2. Marker Functions
export const draggableMarker = (
  lon: number,
  lat: number,
  pin: HTMLDivElement,
  map: Map
) => {
  return new mapboxgl.Marker(pin, { draggable: true })
    .setLngLat([lon, lat])
    .setOffset([0, -20])
    .addTo(map);
};

export const nonDraggableMarker = (
  lon: number,
  lat: number,
  pin: HTMLDivElement,
  map: Map
) => {
  return new mapboxgl.Marker(pin, { offset: [0, -20] })
    .setLngLat([lon, lat])
    .addTo(map);
};

export const renderPopUp = (
  { image, name, description, location }: Campground,
  map: Map
) => {
  return new mapboxgl.Popup({ offset: 30 }) // add popups
    .setLngLat(location as LngLatLike)
    .setHTML(
      `
              <img src="${image}">
              <h3>${name}</h3>
              <p>${description}</p>
              `
    )
    .addTo(map);
};



