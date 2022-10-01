import FileInput from './FileInput.component';
import LocationInput from './LocationInput.component';
import { addNewCampground } from '../Services';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';
import { v4 } from 'uuid';

import storage from '../firebase';
import mapboxgl, { LngLat } from 'mapbox-gl';
const CloseButton = require('../assets/add-button.svg');

type Props = {
  setAddNew: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  addNew: boolean;
  currentLocation: LngLat;
};

const NewCampsite = ({
  currentLocation,
  setModal,
  setAddNew,
  addNew,
}: Props) => {
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [coordinates, setCoordinates] = useState(new mapboxgl.LngLat(2, 41.45));
  const [buttonText, setButtonText] = useState('Create');

  const uploadFile = async () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, imageUpload);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };

  const submitHandler = async (e: any) => {
    try {
      setButtonText('Creating...');
      const pointer = document.getElementById('create-button');
      pointer && pointer.setAttribute('style', 'cursor: wait');
      setAddNew(true);
      e.preventDefault();
      const url = await uploadFile();
      const newCampground = {
        name: e.target[0].value,
        description: e.target[1].value,
        location: new mapboxgl.LngLat(coordinates.lng, coordinates.lat),
        image: url!,
      };
      console.log(newCampground);
      addNewCampground(newCampground);
      e.target[0].value = '';
      e.target[1].value = '';
      e.target[4].value = '';
      setButtonText('Create');
      setModal(false);
      setAddNew(false);
    } catch (err) {
      console.log('Error from newCampsite.component/submitHandler');
    }
  };

  return (
    <main className='new-campground-container'>
      <div className='head-new-campground'>
        <>
          <h2 id='add-new'>Add a new campground</h2>
        </>
        <div className='close-button-div'>
          <CloseButton
            type='button'
            id='close-button'
            onClick={() => {
              setModal(false);
            }}
          ></CloseButton>
        </div>
      </div>
      <fieldset disabled={addNew}>
        <form
          type='submit'
          onSubmit={submitHandler}
        >
          <div className='sub-entry'>
            <p className='input-label'>Give it a name</p>
            <input
              placeholder='Insert a name for this campground'
              required
            ></input>
            <p className='input-label'>Give it a description</p>
            <textarea
              type='text'
              placeholder='Insert a description for this location'
              required
            ></textarea>
            <p className='input-label'>Choose an image</p>
            <FileInput setImageUpload={setImageUpload}></FileInput>
          </div>
          <div className='sub-entry'>
            <p className='input-label'>
              Set the location by dragging the marker
            </p>
            <LocationInput
              currentLocation={currentLocation}
              setCoordinates={setCoordinates}
            ></LocationInput>
          </div>
          <button id='create-button'>{buttonText}</button>
        </form>
      </fieldset>
    </main>
  );
};

export default NewCampsite;

