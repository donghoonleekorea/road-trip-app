import FileInput from "./FileInput.component";
import LocationInput from "./LocationInput.component";
import { addNewCampground } from '../Services';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useState } from "react";
import storage from '../firebase';
import { ReactComponent as CloseButton } from '../assets/add-button.svg';



function NewCampsite ({ setModal }) {

  const [imageUpload, setImageUpload] = useState(null);
  const [coordinates, setCoordinates] = useState([2, 41.45]);
  
  const uploadFile = async (e) => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    const snapshot = await uploadBytes(imageRef, imageUpload);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const url = await uploadFile();
      const newCampround = {
        name: e.target[0].value,
        description: e.target[1].value,
        location: {longitude: coordinates[0], latitude: coordinates[1]},
        image: url
      }
      console.log(newCampround);
      addNewCampground(newCampround);
      e.target[0].value = '';
      e.target[1].value = '';
      e.target[4].value = '';
      setModal(false);
    } catch (err) {
      console.log('Error from newCampsite.component/submitHandler');
    }
  };

  return (
    <div className="new-campground-container">
      <form type='submit' onSubmit={submitHandler}>
        <h2>Add a new campground</h2>
        <p className="input-label">NAME</p>
        <input placeholder='Insert a name for this campground' required={true}></input>
        <p className="input-label">DESCRIPTION</p>
        <input type='text' placeholder='Insert a description for this location' required={true}></input>
        <p className="input-label">LOCATION</p>
        <LocationInput setCoordinates={setCoordinates} required={true}></LocationInput>
        <p className="input-label">IMAGE</p>
        <FileInput setImageUpload={setImageUpload} required={true}></FileInput> 
        <button>Create</button>
      </form>
      <div className='close-button-div'>
        <CloseButton type='button' id='close-button' onClick={() => {setModal(false)}}></CloseButton>
      </div>
    </div>
  )
}

export default NewCampsite;