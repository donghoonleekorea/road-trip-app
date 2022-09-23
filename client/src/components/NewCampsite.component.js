import FileInput from "./FileInput.component";
import { addNewCampground } from "../Services";

function NewCampsite () {

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(e);
      const newCampround = {
        name: e.target[0].value,
        description: e.target[1].value,
        location: e.target[2].value,
        image: e.target[3].value
      }
      console.log(newCampround);
      addNewCampground(newCampround);
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
        <input required={true}></input>
        <p className="input-label">IMAGES</p>
        <FileInput></FileInput>
        <button>Create</button>
      </form>
    </div>
  )
}

export default NewCampsite;