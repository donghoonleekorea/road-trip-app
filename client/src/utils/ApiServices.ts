import { Campground } from '../customTypes'

export const addNewCampground = async (campground: Campground): Promise<Campground | void> => {
  try {
    const response = await fetch(
      process.env.REACT_APP_DB_URL + 'campgrounds/',
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(campground),
      }
    );
    return await response.json();
  } catch (error) {
    console.log('Error from addNewCampround in Services');
    alert('Unable to add Campground');
  }
};

export const getAllCampgrounds = async (): Promise<Campground[] | void> => {
  try {
    console.log('Fetching campgrounds from DB');
    const response = await fetch(process.env.REACT_APP_DB_URL + 'campgrounds/');
    return await response.json();
  } catch (err) {
    console.log('Error from getAllCampgrounds in Services');
    alert('Unable to get Campgrounds');
  }
};

export const getCampgroundById = async (id: string): Promise<Campground | void> => {
  try {
    const response = await fetch(
      process.env.REACT_APP_DB_URL + 'campgrounds/' + id
    );
    return response.json();
  } catch (err) {
    console.log('Error from getCampgroundById in Services');
    alert('Unable to get Campground');
  }
};




