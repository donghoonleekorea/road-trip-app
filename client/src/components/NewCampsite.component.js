function NewCampsite () {

  const submitHandler = () => {

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
        <input type='file'></input>
        <button>Create</button>
      </form>
    </div>
  )

}

export default NewCampsite;