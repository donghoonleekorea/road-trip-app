import './FileInput.styles.css';
import React, { useEffect, useState } from 'react';

type Props = { setImageUpload: React.Dispatch<React.SetStateAction<File | null>>}

const FileInput = ({ setImageUpload }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setImageUpload(e.currentTarget.files![0]);
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

