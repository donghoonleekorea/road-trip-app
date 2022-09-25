import './LocationInput.styles.css';
import React, { useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWZlcnJhcmlmaXJtbyIsImEiOiJjaXVyYzlqYXYwMDBqMnptczczdjFsZ2RxIn0.zUalw0sjfenPlLL_HCMpTw';

const LocationInput = ({ setCoordinates }) => {

  const mapContainer = useRef(null);
  const map = useRef(null);
  
  useEffect(() => {

    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [2, 41.45],
      zoom: 5.5,
    });

    // define properties of the draggable marker
    var pin = document.createElement('div');
	  pin.className = 'marker';

    // create a draggable marker on the map
    const marker = new mapboxgl.Marker(pin, {draggable: true})
      .setLngLat([2, 41.45])
      .setOffset([0, -20])
      .addTo(map.current);

    // go to user's location by clicking on the map's top-right button
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true, // track user's movements and display changes on map
        showUserHeading: true // pointer of user's direction
      }));

    // get the coordinates from the position where the pin was dragged to
    const getCoordinates = () => {
      const coordinates = marker.getLngLat();
      setCoordinates([coordinates.lng, coordinates.lat]);
      console.log([coordinates.lng, coordinates.lat]);
    }; 

    console.log(marker.getLngLat());
    
    marker.on('dragend', getCoordinates);

  }, []);

  return (
    <div className='set-location-map-container'>
      <div ref={mapContainer} className='add-location-map'>
      </div>
      </div>
  )
}

export default LocationInput;