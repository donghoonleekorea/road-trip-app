import FileInput from "./FileInput.component";
import LocationInput from "./LocationInput.component";
import { addNewCampground } from '../Services';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useState } from "react";
import storage from '../firebase';

function NewCampsite () {

  const [imageUpload, setImageUpload] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  
  const uploadFile = async (e) => {
    // e.preventDefault();
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    // uploadBytes(imageRef, imageUpload).then((snapshot) => {
    //   getDownloadURL(snapshot.ref).then((url) => {
    //     setImageURL(url);
    //   });
    // });
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
      e.target[2].value = '';
      e.target[3].value = '';
    } catch (err) {
      console.log('Error from newCampsite.component/submitHandler');
    }
  };

  return (
    <div className="new-campground-container">
    {/* <button id="close">X</button> */}
      <form type='submit' onSubmit={submitHandler}>
        <h3>Add a new campground</h3>
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
    </div>
  )
}
// onSubmit={uploadFile}
export default NewCampsite;