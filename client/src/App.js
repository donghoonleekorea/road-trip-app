import './App.css';
import Map from './components/Map.component';
import NewCampsite from './components/NewCampsite.component';
import { ReactComponent as AddButton } from './assets/add-button.svg';
import RoadTripLogo from './assets/road-trip-logo.png';
import { useEffect, useState } from 'react';

function App() {
  const [modal, setModal] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [currentLocation, setCurrentLocation] = useState([]);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(getCoordinates, locationDenied);
  };

  const getCoordinates = (e) => {
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
            currentLocation={currentLocation}
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
