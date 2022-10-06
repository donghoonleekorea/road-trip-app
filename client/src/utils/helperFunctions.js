import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import storage from '../firebase';
import { v4 } from 'uuid';

//uploadFile is used in newCampsite.component. Uploads file to FB
export const uploadFile = async (imageUpload) => {
  if (imageUpload === null) return;
  const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
  const snapshot = await uploadBytes(imageRef, imageUpload);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};

//Next functions help markers.js
export const createPin = (campground) => {
  const id = campground._id;
  const pin = document.createElement('div');
  pin.className = 'marker';
  pin.id = `${id}`;
  return pin;
};
