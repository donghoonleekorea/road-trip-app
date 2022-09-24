import React, { useRef, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import { StylesControl } from 'mapbox-gl-controls';
import { getAllCamprounds } from '../Services';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWZlcnJhcmlmaXJtbyIsImEiOiJjaXVyYzlqYXYwMDBqMnptczczdjFsZ2RxIn0.zUalw0sjfenPlLL_HCMpTw';

function Map () {
  
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [campgrounds, setCampgrounds] = useState([]);

  useEffect(() => {
    getAllCamprounds()
    .then((response) => {setCampgrounds(response)})
  }, [])

  useEffect(() => {
    
    // renders a pin for each campground
    campgrounds.map((campground) => {
      const longitude = JSON.parse(campground.location.longitude);
      const latitude = JSON.parse(campground.location.latitude);

      const pin = document.createElement('div');
      pin.className = 'marker';

      new mapboxgl.Marker(pin)
        .setLngLat([longitude, latitude])
        .addTo(map.current);
    });
    
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [1.94, 43.94], //try to get the user's location here
      zoom: 3.5
    });
    
    // change map styles controls:
    map.current.addControl(new StylesControl({
      styles: [
        {
          label: 'Outdoors',
          styleName: 'Mapbox Outdoors',
          styleUrl: 'mapbox://styles/mapbox/outdoors-v11',
        }, {
          label: 'Satellite',
          styleName: 'Satellite',
          styleUrl: 'mapbox://styles/mapbox/satellite-v9',
        },
      ],
      onChange: (style) => console.log(style),
    }), 'bottom-left');

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
      }))
      new mapboxgl.NavigationControl();
  }, [campgrounds]);

  return (
    <div className='main-container'>
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}

export default Map;