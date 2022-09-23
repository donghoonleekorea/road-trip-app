import './FileInput.styles.css';

const FileInput = ({ setImageUpload }) => {

  return (
    <div className='file-input-container'>
      <input
      type='file'
      onChange={(e) => setImageUpload(e.currentTarget.files[0])}
      ></input>
    </div>
  )
}

export default FileInput;