import './LocationInput.styles.css';
import React, { useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import { MapboxStyleSwitcherControl} from "mapbox-gl-style-switcher";
import "mapbox-gl-style-switcher/styles.css";

mapboxgl.accessToken = 'pk.eyJ1IjoiYWZlcnJhcmlmaXJtbyIsImEiOiJjaXVyYzlqYXYwMDBqMnptczczdjFsZ2RxIn0.zUalw0sjfenPlLL_HCMpTw';

const LocationInput = ({ setCoordinates }) => {

  const mapContainer = useRef(null);
  const map = useRef(null);
  
  useEffect(() => {

    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/aferrarifirmo/cl8hbvmi3001415o9hxsj0b3l',
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
        trackUserLocation: true,
        showUserHeading: true
      }));

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

    // get the coordinates from the position where the pin was dragged to
    const getCoordinates = () => {
      const coordinates = marker.getLngLat();
      setCoordinates([coordinates.lng, coordinates.lat]);
      console.log([coordinates.lng, coordinates.lat]);
    }; 
    
    marker.on('dragend', getCoordinates);

  }, [setCoordinates]);

  return (
    <div className='set-location-map-container'>
      <div ref={mapContainer} className='add-location-map'></div>
    </div>
  )
}

export default LocationInput;