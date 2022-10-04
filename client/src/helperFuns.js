import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl-style-switcher/styles.css';
import { MapboxStyleSwitcherControl } from 'mapbox-gl-style-switcher';
import { switcherStyles } from './data';
import { getCampgroundById } from './Services';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export const initializeMap = (mapContainer, currentLocation) => {
  return new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/aferrarifirmo/cl8hbvmi3001415o9hxsj0b3l',
    center: currentLocation,
    zoom: 4,
  });
};

export const mapSearchBar = () => {
  return new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: false,
  });
}

export const addMapSearchBar = (map) => {
  const geocoder = mapSearchBar();
  return document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
};

export const locationControl = () => {
  return new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true,
  });
};

export const createPin = (campground) => {
  const id = campground._id;

  const pin = document.createElement('div');
  pin.className = 'marker';
  pin.id = `${id}`;
  return pin;
};

export const nonDraggableMarker = (lon, lat, pin, map) => {
  return new mapboxgl.Marker(pin, { offset: [0, -20] })
    .setLngLat([lon, lat])
    .addTo(map);
};

export const draggableMarker = (lon, lat, pin, map) => {
  return new mapboxgl.Marker(pin, { draggable: true })
        .setLngLat([lon, lat])
        .setOffset([0, -20])
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
}

export const createMainMap = (map, mapContainer, currentLocation) => {
  map.current = initializeMap(mapContainer, currentLocation);

  addMapSearchBar(map.current);

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

export const createMarkers = (campgrounds, map) => {
  campgrounds.forEach((campground) => {
    const longitude = JSON.parse(campground.location.longitude);
    const latitude = JSON.parse(campground.location.latitude);

    const pin = createPin(campground);

    nonDraggableMarker(longitude, latitude, pin, map.current);

    // add a popup on click ONLY *important*
    // if we add a popup to each marker when we create it
    // it will download every image from the FB storage everytime the markers are rendered
    // the storage downloads are limited so we'll lose access to images as soon as we reach the limit
    pin.addEventListener('click', async () => {
      const pinnedCampground = await getCampgroundById(pin.id);
      renderPopUp(pinnedCampground, map.current);
    });
  });
};



