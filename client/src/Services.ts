interface Campground {
  name: string;
  location: {
    longitude: string;
    latitude: string;
  };
  description: string;
  image: string;
}

export const addNewCampground = async (campground: Campground): Promise<Campground | string> => {
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
    return String(alert('Unable to add Campground'));
  }
};

export const getAllCamprounds = async (): Promise<Campground[] | string> => {
  try {
    console.log('Fetching camprounds from DB');
    const response = await fetch(process.env.REACT_APP_DB_URL + 'campgrounds/');
    return await response.json();
  } catch (err) {
    console.log('Error from getAllCampgrounds in Services');
    return String(alert('Unable to get Campgrounds'));
  }
};

export const getCampgroundById = async (id: string): Promise<Campground | string> => {
  try {
    const response = await fetch(
      process.env.REACT_APP_DB_URL + 'campgrounds/' + id
    );
    return response.json();
  } catch (err) {
    console.log('Error from getCampgroundById in Services');
    return String(alert('Unable to get Campground'));
  }
};

