import './App.css';
import Maps from './components/Maps.component';
import NewCampsite from './components/NewCampsite.component';
import { ReactComponent as AddButton } from './assets/add-button.svg';
import RoadTripLogo from './assets/road-trip-logo.png';
import React, { useEffect, useState } from 'react';
import { Location } from './customTypes';

function App() {
  const [modal, setModal] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(getCoordinates, locationDenied);
  };

  const getCoordinates = (e: GeolocationPosition) => {
    setCurrentLocation({ lon: e.coords.longitude, lat: e.coords.latitude });
  };

  const locationDenied = () => {
    setCurrentLocation({ lon: 0, lat: 44 });
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
      <Maps
        currentLocation={currentLocation!}
        addNew={addNew}
      />
      <div className='add-button-div'>
        <AddButton
          title='Add Campsite'
          type='button'
          id='add-button'
          onClick={setModal}
        />
      </div>
      {modal && (
        <div>
          <NewCampsite
            currentLocation={currentLocation!}
            addNew={addNew}
            setAddNew={setAddNew}
            setModal={setModal}
          />
        </div>
      )}
    </main>
  );
}

export default App;

