import FileInput from '../components/FileInput.component';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import fakeImg from './mocks/mocks';
import { Simulate } from 'react-dom/test-utils';

let inputFile;
let figure;
let setImageUpload = jest.fn();
let selectedFile = false; 
beforeEach(() => {

  render(<FileInput setImageUpload={setImageUpload}/>);
  inputFile = screen.getByTestId('image-input');
  figure = screen.queryByRole('figure');
});

test('should show input file box', () => {
  expect(inputFile).toBeInTheDocument();
});

test('figure not rendering at initial state', () => {
  expect(figure).toBeNull();
});

test('user can upload a file', async () => {
  Simulate.change(inputFile, {target: { files: [fakeImg]}});
  // Once user uploads the onSelectFile functions gets triggered
  setImageUpload.mockReturnValueOnce(!selectedFile)
  expect(setImageUpload).toHaveBeenCalledTimes(1);
  figure = screen.getByRole('figure');
  expect(figure).toBeInTheDocument()
})






