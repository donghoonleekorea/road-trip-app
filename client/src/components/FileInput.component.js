import './FileInput.styles.css';
import { useEffect, useState } from 'react';

const FileInput = ({ setImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setImageUpload(e.currentTarget.files[0]);
  };

  return (
    <div className='file-input-container'>
      <input
        data-testid='image-input'
        id='choose-file'
        type='file'
        accept='.jpg, .jpeg, .png, .gif'
        // multiple
        onChange={onSelectFile}
      ></input>
      {selectedFile && (
        <figure className='preview-div'>
          <img
            id='preview-img'
            alt='preview'
            src={preview}
          />
        </figure>
      )}
    </div>
  );
};

export default FileInput;

