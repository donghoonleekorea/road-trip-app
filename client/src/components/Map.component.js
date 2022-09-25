import React, { useRef, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import { getAllCamprounds } from '../Services';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { MapboxStyleSwitcherControl} from "mapbox-gl-style-switcher";
import "mapbox-gl-style-switcher/styles.css";
mapboxgl.accessToken = 'pk.eyJ1IjoiYWZlcnJhcmlmaXJtbyIsImEiOiJjaXVyYzlqYXYwMDBqMnptczczdjFsZ2RxIn0.zUalw0sjfenPlLL_HCMpTw';

function Map ({ modalState }) {
  
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [campgrounds, setCampgrounds] = useState([]);

  useEffect(() => {
    getAllCamprounds()
    .then((response) => {setCampgrounds(response)});
  }, [modalState]);

  useEffect(() => {
    
    // renders a marker for each campground
    campgrounds.map((campground) => {
      const longitude = JSON.parse(campground.location.longitude);
      const latitude = JSON.parse(campground.location.latitude);
      // const image = campground.image;
      const name = campground.name;
      const description = campground.description;

      const pin = document.createElement('div');
      pin.className = 'marker';

      new mapboxgl.Marker(pin, { offset: [0, -20] })
        .setLngLat([longitude, latitude])
        // add a pop-up for each marker
        .setPopup(
          new mapboxgl.Popup({ offset: 30 }) // add popups
            .setHTML(
              `<h3>${name}</h3>
              <p>${description}</p>
              `
              // <img src="${image}">
            )
        )
        .addTo(map.current);
    });
    
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/aferrarifirmo/cl8hbvmi3001415o9hxsj0b3l',
      center: [1.94, 43.94],
      zoom: 3.5
    });

    // add search bar to the map 
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false,
      });
    
    document.getElementById('geocoder').appendChild(geocoder.onAdd(map.current));

    // custom styles inside switcher
    const styles = [
      {
        title: "Default",
        uri:"mapbox://styles/aferrarifirmo/cl8hbvmi3001415o9hxsj0b3l"
      },
      {
        title: "Outdoors",
        uri:"mapbox://styles/mapbox/outdoors-v11"
      },
      {
        title: "Sattelite",
        uri:"mapbox://styles/mapbox/satellite-streets-v11"
      }
    ];

    // add style switcher
    map.current.addControl(new MapboxStyleSwitcherControl(styles));
    
    // add zoom and rotation controls to the map.
    map.current.addControl(new mapboxgl.NavigationControl());
    
    // add scale
    const scale = new mapboxgl.ScaleControl({
      maxWidth: 200,
      unit: 'metric'
    });
    map.current.addControl(scale);

    // current location control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
    }));
  }, [campgrounds]);
  
  return (
    <div className='main-container'>
    <div id="geocoder" className="geocoder"></div>
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}

export default Map;