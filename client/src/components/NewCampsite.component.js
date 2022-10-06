import FileInput from './FileInput.component';
import LocationInput from './LocationInput.component';
import { addNewCampground } from '../utils/ApiServices';
import { useState } from 'react';
import { ReactComponent as CloseButton } from '../assets/add-button.svg';
import { uploadFile } from '../utils/helperFunctions';

const NewCampsite = ({ currentLocation, setModal, setAddNew, addNew }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [coordinates, setCoordinates] = useState([2, 41.45]);
  const [buttonText, setButtonText] = useState('Create');

  const submitHandler = async (e) => {
    try {
      setButtonText('Creating...');
      const pointer = document.getElementById('create-button');
      pointer.style.cursor = 'wait';
      setAddNew(true);
      e.preventDefault();
      //uploadFile returns url of image in FB
      const url = await uploadFile(imageUpload);
      const newCampround = {
        name: e.target[0].value,
        description: e.target[1].value,
        location: { longitude: coordinates[0], latitude: coordinates[1] },
        image: url,
      };
      console.log(newCampround);
      addNewCampground(newCampround);
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
          />
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
              required={true}
            ></input>
            <p className='input-label'>Give it a description</p>
            <textarea
              type='text'
              placeholder='Insert a description for this location'
              required={true}
            ></textarea>
            <p className='input-label'>Choose an image</p>
            <FileInput
              setImageUpload={setImageUpload}
              required
            />
          </div>
          <div className='sub-entry'>
            <p className='input-label'>
              Set the location by dragging the marker
            </p>
            <LocationInput
              currentLocation={currentLocation}
              setCoordinates={setCoordinates}
              required
            />
          </div>
          <button id='create-button'>{buttonText}</button>
        </form>
      </fieldset>
    </main>
  );
};

export default NewCampsite;

