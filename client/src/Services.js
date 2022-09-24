export const addNewCampground = async (campground) => {
  try {
    const response = await fetch(process.env.REACT_APP_DB_URL, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8'},
      body: JSON.stringify(campground)
    });
    return response.json();
  } catch (error) {
    console.log('Error from addNewCampround in Services')
  }
};

export const getAllCamprounds = async () => {
  try {
    console.log('Fetching camprounds from DB');
    const response = await fetch(process.env.REACT_APP_DB_URL);
    return response.json();
  } catch (err) {
    console.log('Error from getAllCampgrounds in Services');
  }
};