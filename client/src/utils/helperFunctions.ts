import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import storage from '../firebase';
import { v4 } from 'uuid';
import {Campground} from '../customTypes'

//uploadFile is used in newCampsite.component. Uploads file to FB
export const uploadFile = async (imageUpload: File) => {
  if (imageUpload === null) return;
  const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
  const snapshot = await uploadBytes(imageRef, imageUpload);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};

//Next functions help markersMaker.js
export const createPin = (campground: Campground) => {
  const id = campground._id;
  const pin = document.createElement('div');
  pin.className = 'marker';
  pin.id = `${id}`;
  return pin;
};
