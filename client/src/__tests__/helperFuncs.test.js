import { campground } from './mocks/mocks';
import { createPin } from '../utils/helperFuncs';

describe('createPin function', () => {
  const pin = createPin(campground);
  test('pin has id from campground', () => {
    expect(pin.id).toBe(`${campground._id}`);
  });
  test('adds attribute className to pin', () => {
    expect(pin.className).toBe('marker');
  });
  test('The function returns the pin', () => {
    expect(pin.nodeName).toBe('DIV');
  });
});

