import { nonDraggableMarker, renderPopUp } from './mapboxFunctions';
import { createPin } from './helperFunctions';
import { getCampgroundById } from './ApiServices';
import { Campground } from '../customTypes';
import { Map } from 'mapbox-gl';

export const createMarkersForCampgrounds = (campgrounds: Campground[], map: Map) => {
  campgrounds.forEach((campground) => {
    const longitude = JSON.parse(campground.location.lon as string);
    const latitude = JSON.parse(campground.location.lat as string);
    
    const pin = createPin(campground);

    nonDraggableMarker(longitude, latitude, pin, map);

    // add a popup on click ONLY *important*
    // if we add a popup to each marker when we create it
    // it will download every image from the FB storage everytime the markers are rendered
    // the storage downloads are limited so we'll lose access to images as soon as we reach the limit
    pin.addEventListener('click', async () => {
      const pinnedCampground = await getCampgroundById(pin.id) as Campground;
      renderPopUp(pinnedCampground, map);
    });
  });
};


