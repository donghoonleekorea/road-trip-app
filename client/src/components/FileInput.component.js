import './FileInput.styles.css';
import { useEffect, useState } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import storage from '../firebase';

const FileInput = () => {

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, 'images/');
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  // useEffect(() => {
  //   listAll(imagesListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageUrls((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);


  return (
    <div className='file-input-container'>

      <input
      type='file'
      onChange={(e) => setImageUpload(e.currentTarget.files[0])}
      ></input>

      <button
      onClick={uploadFile}
      > Upload Image</button>
    </div>
    
  )
}

export default FileInput;