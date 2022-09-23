import './FileInput.styles.css';
import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import storage from '../firebase';

const FileInput = ( { setImageUpload, setImageURL }) => {

  // const [imageUpload, setImageUpload] = useState(null);
  
  // const uploadFile = (e) => {
  //   e.preventDefault();
  //   if (imageUpload == null) return;
  //   const imageRef = ref(storage, `images/${imageUpload.name}`);
  //   uploadBytes(imageRef, imageUpload).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       setImageURL(url);
  //     });
  //   });
  //   console.log('imageUpload: ', imageUpload);
  // };


  return (
    <div className='file-input-container'>

      <input
      type='file'
      onChange={(e) => setImageUpload(e.currentTarget.files[0])}
      ></input>
      {/* <button
      onClick={uploadFile}
      > Upload Image</button> */}
    </div>
  )
}

export default FileInput;