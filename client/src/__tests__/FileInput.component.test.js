import FileInput from '../components/FileInput.component';
import { render, screen } from '@testing-library/react';
import fakeImg from './mocks/mocks';
import { Simulate } from 'react-dom/test-utils';

let inputFile;
let figure;
let setImageUpload = jest.fn();

describe('Tests of FileInput component', () => {
  beforeEach(() => {
    render(<FileInput setImageUpload={setImageUpload} />);
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
    Simulate.change(inputFile, { target: { files: [fakeImg] } });
    // Once user uploads the onSelectFile functions from FileInputComponent gets triggered
    expect(setImageUpload).toHaveBeenCalledTimes(1);
  });
})



