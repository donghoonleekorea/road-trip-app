import React, { useRef, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import { getAllCamprounds, getCampgroundById } from '../Services';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { MapboxStyleSwitcherControl} from "mapbox-gl-style-switcher";
import "mapbox-gl-style-switcher/styles.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function Map ({ currentLocation, addNew }) {
  
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [campgrounds, setCampgrounds] = useState([]);

  const getCamps = async () => {
    const camps = await getAllCamprounds();
    setCampgrounds(camps);
    console.log(camps);
  }

  useEffect(() => {
    getCamps();
  }, [addNew]); // gets campgrounds when a new campground is added

  useEffect(()=> console.log('map:', currentLocation[0]), [currentLocation]);

  useEffect(() => {
    // if (currentLocation.length)
    if (map.current || !currentLocation.length) return;
    console.log('currentLocation: ', currentLocation);
    
    // initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/aferrarifirmo/cl8hbvmi3001415o9hxsj0b3l',
      center: currentLocation,
      zoom: 6
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
  }, [campgrounds, currentLocation]);

  useEffect(() => {
    if (currentLocation.length) {
    // creates and renders a marker for each campground
      campgrounds.forEach((campground) => {
        const longitude = JSON.parse(campground.location.longitude);
        const latitude = JSON.parse(campground.location.latitude);
        const id = campground._id;

        const pin = document.createElement('div');
        pin.className = 'marker';
        pin.id = `${id}`;
      
        new mapboxgl.Marker(pin, { offset: [0, -20] })
          .setLngLat([longitude, latitude])
          .addTo(map.current);
      
        // add a popup on click ONLY *important* 
        // if we add a popup to each marker when we create it 
        // it will download every image from the FB storage everytime the markers are rendered
        // the storage downloads are limited so we'll loose access to images as soon as we reach the limit

        pin.addEventListener('click', async () => {
          const name = campground.name;
          const description = campground.description;
          const image = campground.image;
          await getCampgroundById(pin.id);
          new mapboxgl.Popup({ offset: 30 }) // add popups
            .setLngLat([longitude, latitude])
            .setHTML(`
              <img src="${image}">
              <h3>${name}</h3>
              <p>${description}</p>
              `
            )
            .addTo(map.current);
        })
      });
    }
  }, [campgrounds, currentLocation])
  
  return (
    <main className='main-container'>
      <div id="geocoder" className="geocoder"></div>
      {mapContainer && <div ref={mapContainer} className="map-container" />}
    </main>
  );
};

export default Map;