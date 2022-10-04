import './FileInput.styles.css';
import React, { useEffect, useState, useRef } from 'react';

type Props = {
  setImageUpload: React.Dispatch<React.SetStateAction<any>>;
};
const FileInput = ({ setImageUpload }: Props) => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [preview, setPreview] = useState<string>();

  const imageRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl: string = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files);
    setImageUpload(e.target.files);
  };

  return (
    <div className='file-input-container'>
      <input
        ref={imageRef}
        id='choose-file'
        type='file'
        accept='.jpg, .jpeg, .png, .gif'
        required
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


