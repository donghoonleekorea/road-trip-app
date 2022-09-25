import './FileInput.styles.css';
import { useEffect, useState } from 'react';

const FileInput = ({ setImageUpload }) => {

  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
      if (!selectedFile) {
          setPreview(undefined)
          return
      }

      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = (e) => {
      if (!e.target.files || e.target.files.length === 0) {
          setSelectedFile(undefined);
          return;
      }

      // I've kept this example simple by using the first image instead of multiple
      setSelectedFile(e.target.files[0])
      setImageUpload(e.currentTarget.files[0])
  }

  return (
    <div className='file-input-container'>
      <input
      type='file'
      accept='.jpg, .jpeg, .png, .gif'
      // multiple
      onChange={onSelectFile}
      ></input>
      {selectedFile &&  <img alt='preview' src={preview} /> }
    </div>
  )
}

export default FileInput;