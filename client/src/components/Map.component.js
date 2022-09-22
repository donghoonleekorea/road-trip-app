import React, { useRef, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
// import { GeolocateControl } from "react-map-gl";
import { ReactComponent as AddButton } from '../assets/add-button.svg';
import RoadTripLogo from '../assets/road-trip-logo.png';


mapboxgl.accessToken = 'pk.eyJ1IjoiYWZlcnJhcmlmaXJtbyIsImEiOiJjaXVyYzlqYXYwMDBqMnptczczdjFsZ2RxIn0.zUalw0sjfenPlLL_HCMpTw';

function Map () {

  const mapContainer = useRef(null);
  const map = useRef(null);
  // const [lng, setLng] = useState(9.62);
  // const [lat, setLat] = useState(47.49);
  // const [zoom, setZoom] = useState(3.5);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      // center: [lng, lat],
      // zoom: zoom
      center: [1.94, 43.94],
      zoom: 3.5
    });
  });

  // stores the new latitude, longitude, and zoom that you get when a user interacts with the map
  // getCenter() and getZoom() are mapbox methods
  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialize
  //   map.current.on('move', () => {
  //     setLng(map.current.getCenter().lng.toFixed(4));
  //     setLat(map.current.getCenter().lat.toFixed(4));
  //     setZoom(map.current.getZoom().toFixed(2));
  //   });
  // });

  useEffect(() => {
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
      }))
      new mapboxgl.NavigationControl();
    });


  return (
    <div className='main-container'>
        <img src={RoadTripLogo} alt='road-trip-app-logo' id='logo'></img>
        <div className='add-button-div'>
          <AddButton onClick={() => {console.log('clicked')}}></AddButton>
        </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}

export default Map;