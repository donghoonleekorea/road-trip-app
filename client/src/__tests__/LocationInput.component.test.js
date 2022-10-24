import LocationInput from '../components/LocationInput.component';
import { render, screen } from '@testing-library/react';
import 'jest-canvas-mock'
import 'jest-webgl-canvas-mock'
let setCoordinates = jest.fn();
let currentLocation = [40, 40]
let mapContainer;

describe('Tests of LocationInput component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(()=>{})
    render(
      <LocationInput
        setCoordinates={setCoordinates}
        currentLocation={currentLocation}
      />)
      mapContainer = screen.getByTestId('map-container');
  })
  
  test('should show mapContainer', () => {
    expect(mapContainer).toBeInTheDocument()
  })
});







