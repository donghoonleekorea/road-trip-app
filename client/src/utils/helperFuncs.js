import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

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
