import './App.css';
import Map from './components/Map.component';
import NewCampsite from './components/NewCampsite.component';
import { ReactComponent as AddButton } from './assets/add-button.svg';
import RoadTripLogo from './assets/road-trip-logo.png';
import { useState } from 'react';

function App() {

  const [modal, setModal] = useState(false);
  const [addNew, setAddNew] = useState(false);

  return (
    <div className='main'>
    <div className='header'>
      <img src={RoadTripLogo} alt='road-trip-app-logo' id='logo'></img>
      <div id='heading'><h2>Road trip - Campgrounds</h2></div>
    </div>
      <Map addedNew={addNew}></Map>
      <div className='add-button-div'>
        <AddButton type='button' id='add-button' onClick={setModal}></AddButton>
      </div>
      {modal && 
      <div>
        <NewCampsite addNew={addNew} setAddNew={setAddNew} setModal={setModal}></NewCampsite>
      </div>
    }
    </div>
  );
}

export default App;