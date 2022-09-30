import './App.css';
import Map from './components/Map.component';
import NewCampsite from './components/NewCampsite.component';

import { useEffect, useState } from 'react';
const AddButton = require('./assets/add-button.svg');
const RoadTripLogo = require('./assets/road-trip-logo.png');

function App() {
  const [modal, setModal] = useState<boolean>(false);
  const [addNew, setAddNew] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<number[]>([]);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(getCoordinates, locationDenied);
  };

  const getCoordinates = (e: {coords: {longitude: number, latitude: number}}) => {
    setCurrentLocation([e.coords.longitude, e.coords.latitude]);
  };

  const locationDenied = () => {
    setCurrentLocation([0, 44]);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <main className='main'>
      <header className='header'>
        <p id='loc'></p>
        <img
          src={RoadTripLogo}
          alt='road-trip-app-logo'
          id='logo'
        ></img>
        <div id='heading'>
          <h2>Road trip - Campgrounds</h2>
        </div>
      </header>
      <Map
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
        addNew={addNew}
      ></Map>
      <div className='add-button-div'>
        <AddButton
          title='Add Campsite'
          type='button'
          id='add-button'
          onClick={setModal}
        ></AddButton>
      </div>
      {modal && (
        <div>
          <NewCampsite
            currentLocation={currentLocation}
            addNew={addNew}
            setAddNew={setAddNew}
            setModal={setModal}
          ></NewCampsite>
        </div>
      )}
    </main>
  );
}

export default App;
