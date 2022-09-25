import './App.css';
import Map from './components/Map.component';
import NewCampsite from './components/NewCampsite.component';
import { ReactComponent as AddButton } from './assets/add-button.svg';
import RoadTripLogo from './assets/road-trip-logo.png';
import { useState } from 'react';

function App() {

  const [modal, setModal] = useState(false);

  return (
    <div className='main'>
    <header className='header'>
      <img src={RoadTripLogo} alt='road-trip-app-logo' id='logo'></img>
    </header>
      <Map modalState={modal}></Map>
      <div className='add-button-div'>
        <AddButton type='button' id='add-button' onClick={setModal}></AddButton>
      </div>
      {modal && 
      <div>
        <NewCampsite setModal={setModal} modal={modal}></NewCampsite>
      </div>
    }
    </div>
  );
}

export default App;