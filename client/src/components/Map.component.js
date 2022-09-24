import React, { useRef, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import { StylesControl } from 'mapbox-gl-controls';
import locationPin from '../assets/location-pin.png';
import { getAllCamprounds } from '../Services';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWZlcnJhcmlmaXJtbyIsImEiOiJjaXVyYzlqYXYwMDBqMnptczczdjFsZ2RxIn0.zUalw0sjfenPlLL_HCMpTw';

function Map () {
  
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [campgrounds, setCampgrounds] = useState([]);
  
  useEffect(() => {
    
    getAllCamprounds().then((response) => {setCampgrounds(response)});
    console.log(campgrounds);

    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [1.94, 43.94] || [2, 4], //try to get the user's location here
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

    // cuurent location control
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


      // markers
      map.current.on('load', () => {
        // Add an image to use as a custom marker
        map.current.loadImage(
        locationPin,
        (error, image) => {
        if (error) throw error;
    
        map.current.addImage('custom-marker', image);
        // Add a GeoJSON source with 2 points
        map.current.addSource('points', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': [
        {
        // feature for Mapbox DC
        'type': 'Feature',
        'geometry': {
        'type': 'Point',
        'coordinates': [
        -77.03238901390978, 38.913188059745586
        ]
        },
        'properties': {
        'title': 'Mapbox DC'
        }
        },
        {
        // feature for Mapbox SF
        'type': 'Feature',
        'geometry': {
        'type': 'Point',
        'coordinates': [-122.414, 37.776]
        },
        }
        ]
        }
        });
         
        // Add a symbol layer
        map.current.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'points',
        'layout': {
        'icon-image': 'custom-marker',
        }
        });
        }
        );
    });
  }, []);
    

  return (
    <div className='main-container'>
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}

export default Map;