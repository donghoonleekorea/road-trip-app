import FileInput from './FileInput.component';
import LocationInput from './LocationInput.component';
import { addNewCampground } from '../utils/ApiServices';
import React, { useState, useRef } from 'react';
import { ReactComponent as CloseButton } from '../assets/add-button.svg';
import { uploadFile } from '../utils/helperFunctions';
import {Location} from '../customTypes'
type Props = {
  currentLocation: Location;
  setModal:React.Dispatch<React.SetStateAction<boolean>>;
  setAddNew: React.Dispatch<React.SetStateAction<boolean>> ;
  addNew: boolean;
}

const NewCampsite = ({ currentLocation, setModal, setAddNew, addNew }: Props) => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [coordinates, setCoordinates] = useState([2, 41.45]);
  const [buttonText, setButtonText] = useState('Create');
  const nameRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null)
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setButtonText('Creating...');
      const pointer = document.getElementById('create-button');
      pointer!.style.cursor = 'wait';
      setAddNew(true);
      e.preventDefault();
      //uploadFile returns url of image in FB
      const url = await uploadFile(imageUpload!);
      const newCampground = {
        name: nameRef.current!.value,
        description: descriptionRef.current!.value,
        location: { lon: coordinates[0], lat: coordinates[1] },
        image: url as string,
      };
      console.log('this is theNewCampground', newCampground)
      addNewCampground(newCampground);
      nameRef.current!.value = '';
      descriptionRef.current!.value = '';
      // e.target[4].value = '';
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
          />
        </div>
      </div>
      <fieldset disabled={addNew}>
        <form
          onSubmit={submitHandler}
        >
          <div className='sub-entry'>
            <p className='input-label'>Give it a name</p>
            <input
              ref={nameRef}
              placeholder='Insert a name for this campground'
              required
            />
            <p className='input-label'>Give it a description</p>
            <textarea
              ref={descriptionRef}
              placeholder='Insert a description for this location'
              required
            />
            <p className='input-label'>Choose an image</p>
            <FileInput
              setImageUpload={setImageUpload}
            />
          </div>
          <div className='sub-entry'>
            <p className='input-label'>
              Set the location by dragging the marker
            </p>
            <LocationInput
              currentLocation={currentLocation}
              setCoordinates={setCoordinates}
            />
          </div>
          <button type='submit' id='create-button'>{buttonText}</button>
        </form>
      </fieldset>
    </main>
  );
};

export default NewCampsite;


