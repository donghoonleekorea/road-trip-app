import './LocationInput.styles.css';
import React, { useRef, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWZlcnJhcmlmaXJtbyIsImEiOiJjaXVyYzlqYXYwMDBqMnptczczdjFsZ2RxIn0.zUalw0sjfenPlLL_HCMpTw';

const LocationInput = ({ setCoordinates }) => {

  const mapContainer = useRef(null);
  const map = useRef(null);

  const pinCoordinates = useRef();
  const [marker, setMarker] = useState([2, 41.45]);
  
  
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      // center: [lng, lat],
      // zoom: zoom
      center: [2, 41.45],
      zoom: 5.5,
    });

    // create a draggable marker on the map
    const pin = new mapboxgl.Marker({draggable: true})
      .setLngLat([2, 41.45])
      .addTo(map.current);
    setMarker(pin);

    // go to user's location by clicking on the map's top-right button
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true, // track user's movements and display changes on map
        showUserHeading: true // pointer of user's direction
      }));

    // new mapboxgl.NavigationControl();

    // on mousemove get coordinates
    // map.current.on('mousemove', (e) => {
    //   pinCoordinates.current = e.lngLat;
    //   console.log(pinCoordinates);
    // });
    // marker.on('dragend', getCoordinates());
  }, []);

    // const getCoordinates = async () => {
    //   // setCoordinates([pinCoordinates.current.lng, pinCoordinates.current.lat]);
    //   console.log([pinCoordinates.current.lng, pinCoordinates.current.lat]);
    //   // const el = document.createElement('div');
    //   // el.className = 'marker';
    //   // new mapboxgl.Marker(el)
    //   //   .setLngLat([pinCoordinates.current.lng, pinCoordinates.current.lat])
    //   //   .addTo(map.current);
    //   setCoordinates([pinCoordinates.current.lng, pinCoordinates.current.lat])
    //   console.log([pinCoordinates.current.lng, pinCoordinates.current.lat]);
    //   return [pinCoordinates.current.lng, pinCoordinates.current.lat];
    // }

    // get the coordinates from the position where the pin was dragged to
    // const getCoordinates = () => {
    //   const coordinates = marker.getLngLat();
    //   setCoordinates([coordinates.lng, coordinates.lat]);
    //   console.log([coordinates.lng, coordinates.lat]);
    //   return [coordinates.lng, coordinates.lat]
    // }; 


  return (
    <div className='set-location-map-container'>
      <div ref={mapContainer} className='add-location-map'>
      </div>
      </div>
  )
}

export default LocationInput;