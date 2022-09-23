import './LocationInput.styles.css';
import React, { useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWZlcnJhcmlmaXJtbyIsImEiOiJjaXVyYzlqYXYwMDBqMnptczczdjFsZ2RxIn0.zUalw0sjfenPlLL_HCMpTw';

const LocationInput = ({ setCoordinates }) => {

  const mapContainer = useRef(null);
  const map = useRef(null);

  const pinCoordinates = useRef();
  
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      // center: [lng, lat],
      // zoom: zoom
      center: [1.94, 43.94],
      zoom: 7,
    });

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
    map.current.on('mousemove', (e) => {
      pinCoordinates.current = e.lngLat;
    });
  });

    const getCoordinates = async () => {
      // setCoordinates([pinCoordinates.current.lng, pinCoordinates.current.lat]);
      console.log([pinCoordinates.current.lng, pinCoordinates.current.lat]);
      // const el = document.createElement('div');
      // el.className = 'marker';
      // new mapboxgl.Marker(el)
      //   .setLngLat([pinCoordinates.current.lng, pinCoordinates.current.lat])
      //   .addTo(map.current);
      setCoordinates([pinCoordinates.current.lng, pinCoordinates.current.lat])
      return [pinCoordinates.current.lng, pinCoordinates.current.lat];
    }

    // map.current.on('mousemove', (e) => {
    //   console.log(e);
    //   document.getElementById('info').innerHTML =
    //   // `e.point` is the x, y coordinates of the `mousemove` event
    //   // relative to the top-left corner of the map.
    //   JSON.stringify(e.point) +
    //   '<br />' +
    //   // `e.lngLat` is the longitude, latitude geographical position of the event.
    //   JSON.stringify(e.lngLat.wrap());
    //   });

  return (
    <div className='set-location-map-container'>
      <div ref={mapContainer} className='add-location-map' onClick={getCoordinates}>
      </div>
      </div>
  )
}

export default LocationInput;