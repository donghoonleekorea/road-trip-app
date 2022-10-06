import { nonDraggableMarker, renderPopUp } from './mapboxFunctions';
import { createPin } from './helperFunctions';
import { getCampgroundById } from './ApiServices';

export const createMarkersForCampgrounds = (campgrounds, map) => {
  campgrounds.forEach((campground) => {
    const longitude = JSON.parse(campground.location.longitude);
    const latitude = JSON.parse(campground.location.latitude);

    const pin = createPin(campground);

    nonDraggableMarker(longitude, latitude, pin, map.current);

    // add a popup on click ONLY *important*
    // if we add a popup to each marker when we create it
    // it will download every image from the FB storage everytime the markers are rendered
    // the storage downloads are limited so we'll lose access to images as soon as we reach the limit
    pin.addEventListener('click', async () => {
      const pinnedCampground = await getCampgroundById(pin.id);
      renderPopUp(pinnedCampground, map.current);
    });
  });
};

